import './App.css';
import Maps from './Maps.js';
// import PageHeader from './PageHeader';
import './atlanta-img.png';
import {
  // existing imports
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import Filters from './Filters';
function App() {
  const MapWrapped = withScriptjs(withGoogleMap(Maps));

  return (
    <div>
      <header className='App-header'>Optimizing Ambulance Response Times</header>
      <div className="float-container">
        <div class="float-child">
          <div className='lhs_filters'>
            <Filters/>
          </div>
        </div>
        <div class="float-child">
          <img src={require('./atlanta-img.png')} />
        </div>
      </div>

    </div>
  );
}

export default App;

      {/* <Maps/>
      <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCHy5yhyFcyRzaEQwyPnIA-mNTmHCBZHVs`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div> */}