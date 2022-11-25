import { GoogleMap, Marker } from "react-google-maps";

function Maps() {
    console.log('TESTTT');
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 45.4211, lng: -75.6903 }}>
      { /* We will render our data here */ }
      <Marker
          key='1'
          position={{
            lat: 45.4211,
            lng: -75.6903 
          }}
          icon={{
            url: `/skateboarding.svg`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
    </GoogleMap>
  );
}
export default Maps;