from collections import Counter
import numpy as np
from backend.data import nearest_hospitals, get_estimated_trip_time

class AmbulanceMapping:

    def __init__(self, ambulance_counter: Counter):
        self.mapping = ambulance_counter
        self.average_response_time = 0
        self.worst_response_time = 0
        self.response_time_per_tract = 0
        self.response_time_per_area = 0
        self.ran_simulation = False

    def run_simulation(self, requests: list[(int, int)], min_time: int, max_time: int):
        free_list = Counter(self.mapping)
        to_patient = [] # (time of dispatch, time of arrival, original tract, destination tract)
        to_hosp = [] # (time of dispatch, time of dispatch from scene, time of arrival, original tract, destinaion tract, tract of request)
        returning_from_hosp = [] # (time of arrival, destination tract)
        need_help = [] # subset of requests, which is (time, tract)
        trip_times = [] # (response time, census tract)
        second_interval = 15
        min_index = 0
        for t in range(min_time, second_interval + 1 + (max_time - max_time % second_interval), second_interval):
            h = t // 3600
            max_index = [i for i in range(min_index, len(requests)) if requests[0][i] > t][0]
            need_help += requests[min_index:max_index]
            to_remove = []
            for i in range(len(to_patient)):
                data = to_patient[i]
                if data[1] >= t:
                    to_remove.append(i)
                    nearest_hosp = nearest_hospitals[(data[3], h)]
                    to_hosp.append((data[0], data[1], data[1] + nearest_hosp[1], data[2], nearest_hosp[0], data[3]))
            to_patient = [to_patient[i] for i in range(len(to_patient)) if i not in to_remove]
            to_remove = []
            for i in range(len(to_hosp)):
                data = to_hosp[i]
                if data[2] >= t:
                    to_remove.append(i)
                    estimated_time = get_estimated_trip_time(data[4], data[3], h)
                    trip_times.append((data[2] - data[0], data[5]))
                    returning_from_hosp.append((data[2] + estimated_time, data[3]))
            to_hosp = [to_hosp[i] for i in range(len(to_hosp)) if i not in to_remove]
            to_remove = []
            for i in range(len(returning_from_hosp)):
                data = returning_from_hosp[i]
                if data[0] >= t:
                    to_remove.append(i)
                    free_list[data[1]] += 1
            returning_from_hosp = [returning_from_hosp[i] for i in range(len(returning_from_hosp)) if i not in to_remove]
            to_remove = []
            avail_ambulances = sum([free_list[k] for k in free_list.keys()])
            for i in range(len(need_help)):
                request = need_help[i]
                if avail_ambulances > 0:
                    free_tracts = [(k, get_estimated_trip_time(k, request[1], h)) for k in free_list.keys() if free_list[k] > 0]
                    selected_ambulance = min(free_tracts, key=lambda tup:tup[1])
                    to_patient.append((t, t + selected_ambulance[1], selected_ambulance[0], request[1]))
                    to_remove.append(i)
                    free_list[selected_ambulance] -= 1
                    avail_ambulances -= 1
            need_help = [need_help[i] for i in range(len(need_help)) if i not in to_remove]
            min_index = max_index

        trip_times_numpy = np.array([t[0] for t in trip_times])
        self.average_response_time = np.average(trip_times_numpy)
        self.worst_response_time = np.max(trip_times_numpy)
        response_time_map = {}
        for response_time, tract in trip_times:
            if tract in response_time_map.keys():
                response_time_map[tract].append(response_time)
            else:
                response_time_map[tract] = [response_time]
        self.response_time_per_tract = {}
        for k in response_time_map.keys():
            arr = response_time_map[k]
            self.response_time_per_tract[k] = sum(arr)/len(arr)
        # todo calculate response_time_per_area

    def get_response_time(self):
        return self.average_response_time

    def to_json(self) -> dict[str, float]:
        return {
            'mapping': self.mapping,
            'average_response_time': self.average_response_time,
            'worst_response_time': self.worst_response_time,
            'response_time_per_tract': self.response_time_per_tract,
            'response_time_per_area': self.response_time_per_area,
        }