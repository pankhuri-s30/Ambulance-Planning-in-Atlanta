
def optimal_placement(num_ambulances: int, min_time: int, max_time: int) -> dict[int, int]:
    placement_map = {}
    for i in range(1, 832):
        placement_map[i] = num_ambulances
    return placement_map
