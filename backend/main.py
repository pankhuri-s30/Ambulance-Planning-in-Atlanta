from flask import Flask
from flask import request

from ambulance_calculations import optimal_placement

app = Flask(__name__)

@app.route("/getOptimalPlacement", methods = ['GET'])
def getOptimalPlacement():
    num_ambulances = int(request.args.get('num_ambulances'))
    min_time = int(request.args.get('min_time'))
    max_time = int(request.args.get('max_time'))
    calls_per_day = int(request.args.get('calls_per_day'))
    return optimal_placement(num_ambulances, min_time, max_time, calls_per_day)
