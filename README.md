# Visualizing and Optimizing Ambulance Planning in Atlanta
## Description

Our project's goal is minimizing ambulance response times in Atlanta by providing emergency responders with a tool that enables them to obtain the optimal ambulance mapping given a set of parameters and then view the result of that mapping in a tabular form as well as on an interactive Google Maps-powered map component. This project consists of a Flask web app that provides an API for our project's main backend algorithms, as well as a full-fledged React frontend for simulating ambulance placements and visualizing the results.

The Flask web app consists of 2 REST API calls: one called `getLatLongData` to load the census tract centroids as well as the hospital coordinates for the frontend, as well as `getOptimalPlacement` which will run the backend simulation given a variety of parameters. The React frontend consists of several input fields for configuring the simulation's input parameters, a map that displays the Atlanta hospital locations as well as ambulance placements, and a table that lists the results of the simulation. A screenshot of the frontend can be seen in the Simulation section.

## Installation
As an alternative to the following instructions, you can also watch our instructional [video](https://www.youtube.com/watch?v=ChsFcZOENjA) to understand how to setup and run the application.
### Download Pre-Processed Data Population
Navigate to this [link](https://drive.google.com/drive/folders/1cVqRoRTbFaDZaBMS9EDYjCnak8DGYawN?usp=share_link) and download the files in the `data` folder within the `backend/` directory. You will most likely have to create this folder.

### Installing Python Packages
This project uses Python 3.10 or higher. To install all needed packages, navigate to `backend/` and run `pip install -r requirements.txt`.

### Installing Frontend Packages
In order to run the following available scripts, you must have the Node Package Manager (NPM) installed. You can download NPM from [here](https://nodejs.org/en/download/) and follow the instructions.

Then, from command-line you can navigate to the `frontend/` directory. To install the required npm packages for our project, run `npm install`.

## Execution

### Running the Flask app
To run the Flask app in order to make the Backend RESTful API available for the UI, simply navigate to `backend/` and run `flask --app main run` via terminal or command prompt. You must run this command prior to launching the React frontend.

### Run the React Frontend

In a new terminal or command prompt window from the `frontend/` directory, run `npm start` to start the frontend for our application. This runs the app in the development mode.
Once this command completes, open [http://localhost:3000](http://localhost:3000) in a browser window to navigate to the main web app. The terminal may automatically open this link in your default browser.

## Simulation
When the frontend app is run, the application looks like below 
<img width="1100" alt="Before Simulation" src="https://user-images.githubusercontent.com/114882302/205470420-73f11878-536b-4482-98f2-b7a9b4bdf67c.png">

You can enter the metrics as required and then click on `Simulate` to get the results. A sample image is as shown below
![After Simulation](https://user-images.githubusercontent.com/114882302/205523214-8ba597d1-d385-4d05-84b5-bdbc0ca57f75.jpeg)

