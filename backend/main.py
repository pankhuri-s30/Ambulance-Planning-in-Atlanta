from flask import Flask
from flask import request

from ambulance_calculations import optimal_placement
from data import hospital_names_and_loc_arr, tract_centroid_map

app = Flask(__name__)

def get_or_default(arg_map, default_dict, key):
    return int(arg_map.get(key)) if key in arg_map.keys() else default_dict[key]

@app.route("/getOptimalPlacement", methods = ['GET'])
def getOptimalPlacement():
    default_dict = {'num_ambulances': 100, 'min_time': 0, 'max_time': 86399, 'calls_per_day': 2000, 'random_seed': 5000, 'max_runtime': 300}
    num_ambulances = get_or_default(request.args, default_dict, 'num_ambulances')
    min_time = get_or_default(request.args, default_dict, 'min_time') # in seconds after the start of the day
    max_time = get_or_default(request.args, default_dict, 'max_time') # in seconds after the start of the day. max_time will be inclusive
    max_runtime = get_or_default(request.args, default_dict, 'max_runtime') # max amount of time, in seconds, the algorithm is permitted to run
    calls_per_day = get_or_default(request.args, default_dict, 'calls_per_day')
    random_seed = get_or_default(request.args, default_dict, 'random_seed')
    return optimal_placement(num_ambulances, min_time, max_time, calls_per_day, random_seed, max_runtime).to_json() # see method implmentation for type descriptions

@app.route('/getLatLongData', methods=['GET'])
def getLatLongData():
    return  {
        'hospital_data': hospital_names_and_loc_arr, # 2D array with 3 columns: latitute (float), longitude (float), and hospital name (string)
        'tract_centroids': tract_centroid_map # mapping from census tract ID (int) to an array with the latitude (float) and longitude (float) of the tract centroid
    }