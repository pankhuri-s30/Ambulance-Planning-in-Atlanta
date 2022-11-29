import numpy as np
from collections import Counter
import time

from backend.data import generate_requests
from backend.simulation import AmbulanceMapping

def shake(ambulance_mapping: AmbulanceMapping, k, k_max) -> AmbulanceMapping:
    mapping = ambulance_mapping.mapping
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
        return AmbulanceMapping(new_counter)
    else:
        key_set = list([k for k in mapping.keys() if mapping[k] > 0])
        selected_keys = np.random.choice(np.array(key_set), k - 1, replace=False)
        shuffled = np.random.permutation(selected_keys)
        new_counter = Counter(mapping)
        for i in range(k - 1):
            temp = new_counter[selected_keys[i]]
            new_counter[selected_keys[i]] = new_counter[shuffled[i]]
            new_counter[shuffled[i]] = temp
        return AmbulanceMapping(new_counter)

def first_improvement(mapping: Counter):
    return mapping

def optimal_placement(num_ambulances: int, min_time: int, max_time: int, requests_per_day: int, random_seed: int, max_runtime: int) -> AmbulanceMapping:
    np.random.seed(random_seed)
    requests = generate_requests(min_time, max_time, requests_per_day)
    best_ambulance_mapping = AmbulanceMapping(Counter([np.random.randint(1, 832) for _ in range(num_ambulances)]))
    best_ambulance_mapping.run_simulation(requests, min_time, max_time)
    time_init = int(time.time())
    max_k_value = 8 # todo experiment with this to find the best value
    while int(time.time()) - time_init < max_runtime:
        for k in range(1, max_k_value + 1):
            x_prime = shake(best_ambulance_mapping, k, max_k_value)


    return 
