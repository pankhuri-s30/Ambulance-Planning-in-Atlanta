import pandas as pd
import numpy as np

print('loading backend data...')

aggregate_times = pd.read_csv('./data/aggregate_trip_times.csv')
hourly_times = pd.read_csv('./data/hourly_trip_times.csv')
population_data = pd.read_csv('./data/mix_match_population.csv') #pd.read_csv('./data/only_text_population.csv')
hospital_data = pd.read_csv('./data/hospital_counts.csv', dtype=np.int32)
hospital_names_and_loc = pd.read_csv('./data/hospital_data.csv')
tract_centroid_data = pd.read_csv('./data/tract_centroids.csv')
aggregate_map = aggregate_times.set_index(['srcid','dstid'])['mean_trip_time'].to_dict()
hourly_map = hourly_times.set_index(['srcid','dstid','start_hour'])['mean_trip_time'].to_dict()
population_map = population_data.set_index(['tract'])['population'].to_dict()
hospital_map = hospital_data.set_index(['tract'])['count'].to_dict()
tract_centroid_map = tract_centroid_data.set_index(['tract'])[['x', 'y']].to_dict()
tract_centroid_map = {i: [tract_centroid_map['x'][i], tract_centroid_map['y'][i]] for i in range(1, 832)}
hospital_names_and_loc_arr = hospital_names_and_loc.to_numpy().tolist()

pop_counts = np.array([0] + [population_map[k] for k in range(1, 832)])
cumulative_pop_counts = np.cumsum(pop_counts)

def get_random_tract():
    rand_pop_value = np.random.randint(1, cumulative_pop_counts[-1] + 1)
    return np.argwhere(cumulative_pop_counts >= rand_pop_value)[0][0]

hour_conversion = {}
for i in range(24):
    if i < 7:
        hour_conversion[i] = 0
    elif i < 16:
        hour_conversion[i] = 7
    elif i < 19:
        hour_conversion[i] = 16
    else:
        hour_conversion[i] = 19

def get_intra_travel_noise() -> float:
    return np.random.randint(30, 180)

def get_estimated_trip_time(srcid: int, dstid: int, hour: int) -> float:
    if srcid == dstid:
        return get_intra_travel_noise()
    key1 = (srcid, dstid, hour_conversion[hour])
    if key1 in hourly_map.keys():
        return hourly_map[key1]
    return aggregate_map[(srcid, dstid)]

def generate_requests(min_time: int, max_time: int, requests_per_day: int) -> list[(int, int)]:
    # (tract id, time)
    num_requests = int(((max_time - min_time) / 86400) * requests_per_day)
    arr = [(np.random.randint(min_time, max_time + 1), get_random_tract()) for _ in range(num_requests)]
    arr.sort(key=lambda t: t[0])
    return arr

hospital_location_list = np.array(list(hospital_map.keys()))
nearest_hospitals = {}
for srcid in range(1, 832):
    for h in [0, 7, 16, 19]:
        trip_times = np.array([get_estimated_trip_time(srcid, dst_id, h) for dst_id in hospital_location_list])
        nearest_hospitals[(srcid, h)] = (hospital_location_list[np.argmin(trip_times)], np.min(trip_times))

print('done loading backend data!')