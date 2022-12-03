import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Map, GoogleApiWrapper, MarkerShapeRect, Listing } from "google-maps-react";
import { Marker, InfoWindow } from "google-maps-react";

import { Component } from 'react';
import './App.css';
import MyMarker from './MyMarker';
import axios from 'axios';

class MapsDisplay extends Component {

    state = {
      hosps : this.props.hosps, // All hospitals to be displayed
      google: this.props.google,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      isHospitalApiResponseLoading: true,
    };

    onMarkerClick = (props, marker, e) => {
      console.log('Marker being clicked: ', props.position)
      alert('Alert: '+ props.position.lat + props.position.lng);
      }


    
    render() {
      console.log('Inside maps component');
      var iconMarker = new window.google.maps.MarkerImage(
        // "https://banner2.cleanpng.com/20180802/ogy/kisspng-computer-icons-clip-art-wellington-free-ambulance-red-ambulance-2-icon-free-red-ambulance-icons-5b62eff4306dc0.5741596215332106121984.jpg",
        "https://banner2.cleanpng.com/20180227/vre/kisspng-ambulance-drawing-royalty-free-clip-art-cartoon-ambulance-5a95c90894ac30.060721161519765768609.jpg",
        // "https://thumbs.dreamstime.com/z/ambulance-icon-vector-illustration-template-design-isolated-white-background-flat-website-logo-sign-symbol-app-ui-182207231.jpg",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new window.google.maps.Size(50, 50)
    );
   

    return (
    <div>
    {' '}
    <Map className= 'map-container' google={this.props.google} 
    zoom={12}
    initialCenter={{lat: 33.694275, lng: -84.272163}}
        // onClick={this.onMapClicked}
    >
      <Marker />
      {console.log('All Places: ', this.state)}
        {this.state.hosps.map(place => {
          // console.log('Place: ', { lat: place.lat, lng: place.lng });
          return (
            <Marker
             onClick={this.onMarkerClick}
              key={place.id}
              position={{ lat: place.lat, lng: place.lng }}
              title="Hello World!"
              // name={place.title}
              // icon = {iconMarker} 
              />
          );
        })}
     </Map> 
    </div>
    );
    }
   }
// export default MapsDisplay;

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCHy5yhyFcyRzaEQwyPnIA-mNTmHCBZHVs')
   })(MapsDisplay);