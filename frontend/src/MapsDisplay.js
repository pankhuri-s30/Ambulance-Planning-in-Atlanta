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
      activeID: null,
      selectedPlace: {},
      isHospitalApiResponseLoading: true,
    };

    onMarkerClick = (id) => {
      this.setState({activeID: id});
      //props, marker, e

      // console.log('Marker being clicked: ', props.position)
      // alert('Alert: '+ props.position.lat + props.position.lng);
    }
    render() {
      var iconMarker = new window.google.maps.MarkerImage(
        "./ambulance.png",
        //"https://banner2.cleanpng.com/20180227/vre/kisspng-ambulance-drawing-royalty-free-clip-art-cartoon-ambulance-5a95c90894ac30.060721161519765768609.jpg",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new window.google.maps.Size(30, 30)
    );
  
    return (
      <div>
        <Map className= 'map-container' google={this.state.google} 
          zoom={10}
          initialCenter={{lat: 33.694275, lng: -84.272163}}>
          {console.log('All Places: ', this.state)}
          {this.state.hosps.map(place => {
            const id = `${place.lat},${place.lng}`;
            return (
              <Marker
                onClick={() => this.onMarkerClick(id)}
                key={id}
                position={{ lat: place.lat, lng: place.lng }}
                title="Hello World!"
                // name={place.title}
                // icon = {iconMarker} 
              >
              </Marker>
            );
          })}
          {Object.keys(this.props.ambulanceMapping).map(tractID => {
            const centroid = this.props.centroidData[tractID];
            const id = `${centroid[0]},${centroid[1]}`;
            return (
              <Marker
                onClick={() => this.onMarkerClick(id)}
                key={id}
                position={{ lat: centroid[1], lng: centroid[0] }}
                icon = {iconMarker}
              >
              </Marker>
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