from collections import Counter
import numpy as np
from data import generate_requests
from data import nearest_hospitals, get_estimated_trip_time, hour_conversion

# This object initially just stores the Counter representing the ambulance mapping. The ambulance_counter
# is a dictionary from the census tract ID (int) to the number of ambulances assigned to the tract (int)
# All metrics (average_response_time, worst_response_time, etc) are 0 until run_simulation is executed
class AmbulanceMapping:

    def __init__(self, ambulance_counter: Counter):
        self.mapping = ambulance_counter
        self.average_response_time = 0
        self.worst_response_time = 0
        self.response_time_per_tract = 0
        self.response_time_per_region = 0

    def __str__(self):
        return f'{self.average_response_time},{str(self.mapping)}'

    def run_simulation(self, requests: list[(int, int)], min_time: int, max_time: int):
        free_list = Counter(self.mapping)
        to_patient = [] # (time of dispatch, time of arrival, original tract, destination tract)
        to_hosp = [] # (time of dispatch, time of dispatch from scene, time of arrival, original tract, destinaion tract, tract of request)
        returning_from_hosp = [] # (time of arrival, destination tract)
        need_help = [] # subset of requests, which is (time, tract)
        trip_times = [] # (response time, census tract)
        second_interval = 15
        max_seek = 3600 # process all requests no more than an hour after max_time
        min_index = 0
        # we go a bit beyond the max time to process all ambulances responding to calls near the end of the time interval
        for t in range(min_time, max_time + max_seek + 1, second_interval):
            h = t // 3600
            # first, we get all requests at time <= t that we have not dealt with and copy them to need_help
            matching_indexes = [i for i in range(min_index, len(requests)) if requests[i][0] > t]
            max_index = len(requests) if len(matching_indexes) == 0 else matching_indexes[0]
            need_help += requests[min_index:max_index]
            to_remove = []
            # next, if any ambulances traveling to patients have arrived, we add the time they took to get there (along with location of the call) to trip_times
            # and then we move the ambulance to to_hosp
            for i in range(len(to_patient)):
                data = to_patient[i]
                if data[1] >= t:
                    to_remove.append(i)
                    nearest_hosp = nearest_hospitals[(data[3], hour_conversion[h])]
                    trip_times.append((data[1] - data[0], data[3]))
                    to_hosp.append((data[0], data[1], data[1] + nearest_hosp[1], data[2], nearest_hosp[0], data[3]))
            to_patient = [to_patient[i] for i in range(len(to_patient)) if i not in to_remove]
            to_remove = []
            # if any ambulances have reached the hospital, we send them back to their originally assigned tract
            for i in range(len(to_hosp)):
                data = to_hosp[i]
                if data[2] >= t:
                    to_remove.append(i)
                    estimated_time = get_estimated_trip_time(data[4], data[3], h)
                    # trip_times.append((data[2] - data[0], data[5]))
                    returning_from_hosp.append((data[2] + estimated_time, data[3]))
            to_hosp = [to_hosp[i] for i in range(len(to_hosp)) if i not in to_remove]
            to_remove = []
            # once an ambulance is backed to its assigned tract, it gets added back to the free_list counter
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
                    # get the estimated time for all available ambulances to reach the current request
                    free_tracts = [(k, get_estimated_trip_time(k, request[1], h)) for k in free_list.keys() if free_list[k] > 0]
                    selected_ambulance = min(free_tracts, key=lambda tup:tup[1])
                    # send the closest ambulance to the current request, mark the current request for removal from need_help since
                    # it has been answered, and remove the ambulance from free_list until it is done with the request
                    to_patient.append((t, t + selected_ambulance[1], selected_ambulance[0], request[1]))
                    to_remove.append(i)
                    free_list[selected_ambulance[0]] -= 1
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
        # mapping of census tract to float, which is the average response time for calls originating from that tract
        self.response_time_per_tract = {}
        for k in response_time_map.keys():
            arr = response_time_map[k]
            self.response_time_per_tract[k] = sum(arr)/len(arr)
        # todo calculate response_time_per_region

    def get_response_time(self):
        return self.average_response_time

    def to_json(self) -> dict:
        print(type(self.average_response_time), type(self.worst_response_time), type(self.response_time_per_tract), type(self.response_time_per_region))
        mapping_to_return = {int(i): int(self.mapping[i]) for i in self.mapping.keys() if self.mapping[i] > 0}
        response_time_per_tract = {int(i): float(self.response_time_per_tract[i]) for i in self.response_time_per_tract.keys()}
        return {
            'mapping': mapping_to_return, # mapping from census tract (int) to number of ambulances assigned to that tract (int)
            'average_response_time': float(self.average_response_time), # float, average response time across all tracts
            'worst_response_time': float(self.worst_response_time), # float, worst response time across all tracts
            'response_time_per_tract': response_time_per_tract, # mapping from census tract (int) to average response time for that tract (float)
            'response_time_per_region': self.response_time_per_region, # not currently supported
        }
