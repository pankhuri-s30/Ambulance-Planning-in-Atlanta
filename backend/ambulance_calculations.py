from typing import Tuple
import pandas as pd
import numpy as np
from collections import Counter
import time

print('loading backend data...')

aggregate_times = pd.read_csv('./data/aggregate_trip_times.csv')
hourly_times = pd.read_csv('./data/hourly_trip_times.csv')
population_data = pd.read_csv('./data/mix_match_population.csv') #pd.read_csv('./data/only_text_population.csv')
aggregate_map = aggregate_times.set_index(['srcid','dstid'])['mean_trip_time'].to_dict()
hourly_map = hourly_times.set_index(['srcid','dstid','start_hour'])['mean_trip_time'].to_dict()
population_map = population_data.set_index(['tract'])['population'].to_dict()

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

print('done loading backend data!')

def get_intra_travel_noise(num_tracts: int) -> float:
    return 0

def get_estimated_trip_time(srcid: int, dstid: int, hour: int) -> float:
    if srcid == dstid:
        return get_intra_travel_noise(1)
    key1 = (srcid, dstid, hour_conversion[hour])
    if key1 in hourly_map.keys():
        return hourly_map[key1] + get_intra_travel_noise(2)
    return aggregate_map[(srcid, dstid)] + get_intra_travel_noise(2)

def get_hospital_locations() -> dict[int, int]:
    # we just choose 20 random locations for now
    return {1 + i * 40: 1 for i in range(20)}

def generate_requests(min_time: int, max_time: int, requests_per_day: int) -> list[(int, int)]:
    # (tract id, time)
    num_requests = int(((max_time - min_time) / 86400) * requests_per_day)
    return [(np.random.randint(1, 832), get_random_tract()) for _ in range(num_requests)]


def run_simulation(ambulance_mapping: Counter, requests: list[(int, int)]):
    return 5

def shake(mapping: Counter, k, k_max) -> Counter:
    if k < k_max / 2:
        unflattened = [[item] * mapping[item] for item in mapping.keys()]
        flattened = np.array(unflattened).flatten()
        to_move = np.random.choice(flattened, k + 2, replace=False)
        new_counter = Counter(mapping)
        for item in to_move:
            new_counter[item] -= 1
            # todo remove
            assert new_counter[item] >= 0
        for _ in range(k + 2):
            new_counter[np.random.randint(1, 832)] += 1
        return new_counter
    else:
        key_set = list([k for k in mapping.keys() if mapping[k] > 0])
        selected_keys = np.random.choice(np.array(key_set), k - 1, replace=False)
        shuffled = np.random.permutation(selected_keys)
        new_counter = Counter(mapping)
        for i in range(k - 1):
            temp = new_counter[selected_keys[i]]
            new_counter[selected_keys[i]] = new_counter[shuffled[i]]
            new_counter[shuffled[i]] = temp
        return new_counter

def first_improvement(mapping: Counter):
    return mapping

def optimal_placement(num_ambulances: int, min_time: int, max_time: int, requests_per_day: int, random_seed: int, max_runtime: int):
    np.random.seed(random_seed)
    requests = generate_requests(min_time, max_time, requests_per_day)
    best_ambulance_mapping = Counter([np.random.randint(1, 832) for _ in range(num_ambulances)])
    curr_best_time = run_simulation(best_ambulance_mapping, requests)
    time_init = int(time.time())
    max_k_value = 8 # todo experiment with this to find the best value
    while int(time.time()) - time_init < max_runtime:
        for k in range(1, max_k_value + 1):
            x_prime = shake(best_ambulance_mapping, k, max_k_value)


    return {
        'mapping': best_ambulance_mapping,
        'average_response_time': curr_best_time,
        'worst_response_time': 0,
        'response_time_per_tract': 0,
        'response_time_per_area': 0,
    }
