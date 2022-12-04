//note: code formatted for ES6 here
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Map, GoogleApiWrapper, MarkerShapeRect, Listing } from "google-maps-react";
import { Marker, InfoWindow } from "google-maps-react";

import { Component } from 'react';
import './App.css';
import MyMarker from './MyMarker';
export class MapContainer extends Component {
    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  
    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
  
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };
  
    render() {
      return (
        <Map google={this.props.google}
            onClick={this.onMapClicked}>
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
  
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>
      )
    }
  }