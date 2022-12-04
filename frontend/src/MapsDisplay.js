import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Map, GoogleApiWrapper, MarkerShapeRect, Listing } from "google-maps-react";
import { Marker, InfoWindow } from "google-maps-react";
import { Space, Typography } from 'antd';
import { Component } from 'react';
import './App.css';
import MyMarker from './MyMarker';
import axios from 'axios';
const { Text, Link } = Typography;
class MapsDisplay extends Component {

    state = {
      hosps : this.props.hosps, // All hospitals to be displayed
      google: this.props.google,
      activeID: {},
      selectedPlace: {},
      isHospitalApiResponseLoading: true,
      currentVal: null,
      markerClicked: false,
    };

    onMarkerClick = (id, type) => {
      console.log('Marker click ID: ', id);
      this.setState({markerClicked: true})
      //props, marker, e
      if(type == 'ambulance'){
      let latitude = id.split(',')[0];
      let longitude = id.split(',')[1];
      console.log('Latitude: ', latitude);
      console.log('Longitude: ', longitude);
      const jsonObj = `(${latitude}, ${longitude})`;
      console.log('JSON OBJ: ', jsonObj);
      this.setState({currentVal: 'Ambulance Coordinates:' + jsonObj});
      }
      else{
        this.setState({currentVal: 'Hospital: ' + id})
      }
      // console.log('Marker being clicked: ', props.position)
      // alert('Alert: '+ props.position.lat + props.position.lng);
      // alert('Coordinates: '+ id);

    }
    render() {
      var iconMarker = new window.google.maps.MarkerImage(
        "./ambulance.png",
        //"https://banner2.cleanpng.com/20180227/vre/kisspng-ambulance-drawing-royalty-free-clip-art-cartoon-ambulance-5a95c90894ac30.060721161519765768609.jpg",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new window.google.maps.Size(35, 25)
    );
    
    return (
      <div>
        <div style={{alignContent: "flex-end"}}>
        <span style={{width: 200, marginLeft: '73%'}}>
        <img src="./ambulance.png"  width="35" height="25"/> Ambulance </span> {' '}
        <span style={{width: 200}}>
        <img src="./pin.png"  width="25" height="25"/>Hospital</span>
        </div>
        <Map className= 'map-container' google={this.state.google} 
          zoom={10}
          initialCenter={{lat: 33.694275, lng: -84.272163}}>
          {console.log('All Places: ', this.state)}
          {this.state.hosps.map(place => {
            const id = `${place.lat},${place.lng}`;
            return (
              <Marker
                onClick={() => this.onMarkerClick(place.name)}
                key={id}
                position={{ lat: place.lat, lng: place.lng }}
                title={{ lat: place.lat, lng: place.lng }}
                // name={place.title}
                // icon = {iconMarker} 
              >
                <InfoWindow position={{ lat: place.lat, lng: place.lng }}>Heyy</InfoWindow>
              </Marker>
            );
          })}
          {Object.keys(this.props.ambulanceMapping).map(tractID => {
            const centroid = this.props.centroidData[tractID];
            const id = `${centroid[0]},${centroid[1]}`;
            return (
              <Marker
                onClick={() => this.onMarkerClick(id, 'ambulance')}
                key={id}
                position={{ lat: centroid[1], lng: centroid[0] }}
                icon = {iconMarker}
              >
              </Marker>
            );
          })}
        </Map> 
        {this.state.markerClicked &&
        <div style={{marginTop:'75%', alignContent: 'center'}} className='wrapper'>
        {/* <b></b> */}
        <Text alignContent="center"><b>{this.state.currentVal}</b></Text>
        </div>}
      </div>
    );
    }
   }
// export default MapsDisplay;

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCHy5yhyFcyRzaEQwyPnIA-mNTmHCBZHVs')
})(MapsDisplay);