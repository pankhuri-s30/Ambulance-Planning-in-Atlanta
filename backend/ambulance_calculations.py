import numpy as np
from collections import Counter
import time

from data import generate_requests
from simulation import AmbulanceMapping

def shake(ambulance_mapping: AmbulanceMapping, k: int, k_max: int) -> AmbulanceMapping:
    mapping = ambulance_mapping.mapping
    if k < k_max / 2:
        counts_expanded = []
        for key in mapping.keys():
            for _ in range(mapping[key]):
                counts_expanded.append(key)
        flattened = np.array(counts_expanded)
        to_move = np.random.choice(flattened, k + 2, replace=False)
        new_counter = Counter(mapping)
        for item in to_move:
            new_counter[item] -= 1
            # todo remove
            assert new_counter[item] >= 0
        for _ in range(k + 2):
            new_counter[np.random.randint(1, 832)] += 1
        return AmbulanceMapping(new_counter)
    else:
        key_set = list([k for k in mapping.keys() if mapping[k] > 0])
        selected_keys = np.random.choice(np.array(key_set), k - 1, replace=False)
        shuffled = np.random.permutation(selected_keys)
        new_counter = Counter()
        for k in key_set:
            if k in selected_keys:
                print(np.where(selected_keys == k), np.where(selected_keys == k)[0])
                new_counter[k] = mapping[shuffled[np.where(selected_keys == k)[0][0]]]
            else:
                new_counter[k] = mapping[k]
        return AmbulanceMapping(new_counter)

def first_improvement(ambulance_mapping: AmbulanceMapping, min_time: int, max_time: int, requests: list[(int, int)]) -> AmbulanceMapping:
    to_move = [k for k in ambulance_mapping.mapping.keys() if ambulance_mapping.mapping[k] > 0]
    tries_per_key = min([50 // len(to_move), 5])
    new_locations = np.array([k for k in range(1, 832) if k not in to_move])
    for curr_move in to_move:
        for _ in range(tries_per_key):
            next_move = np.random.choice(new_locations, size=1)[0]
            new_mapping = Counter(ambulance_mapping.mapping)
            new_mapping[curr_move] -= 1
            new_mapping[next_move] += 1
            proposed_mapping = AmbulanceMapping(new_mapping)
            proposed_mapping.run_simulation(requests, min_time, max_time)
            if proposed_mapping.average_response_time <= ambulance_mapping.average_response_time:
                return proposed_mapping
    return ambulance_mapping

def optimal_placement(num_ambulances: int, min_time: int, max_time: int, requests_per_day: int, random_seed: int, max_runtime: int) -> AmbulanceMapping:
    np.random.seed(random_seed)
    requests = generate_requests(min_time, max_time, requests_per_day)
    best_ambulance_mapping = AmbulanceMapping(Counter([np.random.randint(1, 832) for _ in range(num_ambulances)]))
    best_ambulance_mapping.run_simulation(requests, min_time, max_time)
    time_init = int(time.time())
    max_k_value = 8 # todo experiment with this to find the best value
    while int(time.time()) - time_init < max_runtime and best_ambulance_mapping.average_response_time > 480:
        for k in range(1, max_k_value + 1):
            x_prime = shake(best_ambulance_mapping, k, max_k_value)
            x_prime.run_simulation(requests, min_time, max_time)
            x_double_prime = first_improvement(x_prime, min_time, max_time, requests)
            # have to check this in case the same mapping was returned
            if x_double_prime.average_response_time <= best_ambulance_mapping.average_response_time:
                best_ambulance_mapping = x_double_prime
                break
    return best_ambulance_mapping

if __name__ == '__main__':
    seconds_per_hour = 3600
    print(optimal_placement(35, 16 * seconds_per_hour, 24 * seconds_per_hour - 1, 2000, 5000, 300))
