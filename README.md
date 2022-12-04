# Ambulance Planning DVA Project
## Backend Setup Instructions
### Pre-Processed Data Population
Navigate to the DVA Group Project Google Drive, and download `aggregate_trip_times.csv`, `hourly_trip_times.csv`, `mix_match_population.csv`, `only_text_population.csv`, `tract_centroids.csv`, `hospital_counts.csv`, and `hospital_data.csv`. Next, create a folder called `data` within `backend/`, and move these files there.
### Installing Python Packages
This project uses Python 3.10 or higher. To install all needed packages, navigate to `backend/` and run `pip install -r requirements.txt`.
### Running the Flask app
To run the Flask app in order to make the Backend RESTful API available, simply navigate to `backend/` and run `flask --app main run`

## Frontend Setup Instructions
### Prerequisites
In order to run the following available scripts, you must have the Node Package Manager (NPM) installed. Then, from command-line you can navigate to the `frontend/` directory and run any of the scripts described below.

#### `pip install npm`
#### `cd dva-project-fall22-main/frontend/`

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
