import time

from ambulance_calculations import optimal_placement

def save_results(file_name, params, mapping):
    file = open(file_name, "a")  # append mode
    file.write(f'{str(params)}: {str(mapping)}')
    file.write('\n')
    file.close()

base_params = [30, 0, 86399, 2000, 5000, 300]

ambulance_workload = [[n] + base_params[1:] for n in range(10, 60, 10)]
time_workload = [[base_params[0]] + [start_time * 3600, ((start_time + 6) * 3600) - 1] + base_params[3:] for start_time in range(0, 24, 6)]
calls_workload = [base_params[:3] + [n] + base_params[4:] for n in range(500, 2501, 500)]
runtime_workload = [base_params[:-1] + [n] for n in range(60, 481, 60)]

for workload in [ambulance_workload, time_workload, calls_workload, runtime_workload]:
    fname = str(int(time.time())) + '.txt'
    for params in workload:
        print(params)
        mapping = optimal_placement(params[0], params[1], params[2], params[3], params[4], params[5])
        save_results(fname, params, mapping)
        print('done')