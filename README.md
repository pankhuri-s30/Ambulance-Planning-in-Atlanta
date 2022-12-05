# Visualizing and Optimizing Ambulance Planning in Atlanta
You can also watch our instruction [video](https://www.youtube.com/watch?v=ChsFcZOENjA) to understand how to setup and run the application
## Setup Prerequisites
### Download Pre-Processed Data Population
Navigate to this [link](https://drive.google.com/drive/folders/1cVqRoRTbFaDZaBMS9EDYjCnak8DGYawN?usp=share_link) and download the files in the `data` folder within the `backend/` directory.

### Installing Python Packages
This project uses Python 3.10 or higher. To install all needed packages, navigate to `backend/` and run `pip install -r requirements.txt`.

### Running the Flask app
To run the Flask app in order to make the Backend RESTful API available for the UI, simply navigate to `backend/` and run `flask --app main run` via terminal or command prompt

### Installing Frontend Packages
In order to run the following available scripts, you must have the Node Package Manager (NPM) installed. Then, from command-line you can navigate to the `frontend/` directory and run any of the scripts described below.

You can download NPM from [here](https://nodejs.org/en/download/) and follow the instructions

Post that also run to install the required scripts
#### `npm install`

## Run the React Frontend

In a new terminal or command prompt window from the project directory, run the command below to start the application:

#### `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\

## Simulation
When the frontend app is run, the application looks like below 
<img width="1100" alt="Before Simulation" src="https://user-images.githubusercontent.com/114882302/205470420-73f11878-536b-4482-98f2-b7a9b4bdf67c.png">

You can enter the metrics as required and then click on `Simulate` to get the results. A sample image is as shown below
![After Simulation](https://user-images.githubusercontent.com/114882302/205523214-8ba597d1-d385-4d05-84b5-bdbc0ca57f75.jpeg)

