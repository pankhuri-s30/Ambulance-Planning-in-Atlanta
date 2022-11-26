import pandas as pd

print('loading backend data...')

aggregate_times = pd.read_csv('./data/aggregate_trip_times.csv')
hourly_times = pd.read_csv('./data/hourly_trip_times.csv')
aggregate_map = aggregate_times.set_index(['srcid','dstid'])['mean_trip_time'].to_dict()
hourly_map = hourly_times.set_index(['srcid','dstid','start_hour'])['mean_trip_time'].to_dict()

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
    
def optimal_placement(num_ambulances: int, min_time: int, max_time: int, requests_per_day: int) -> dict[int, int]:
    placement_map = {}
    for i in range(1, 832):
        placement_map[i] = num_ambulances
    return placement_map
