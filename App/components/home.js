import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  Dimensions
} from 'react-native';

import {connect} from 'react-redux';
import polyline from 'polyline';
import MapView from 'react-native-maps';
import { RadioButtonGroup, Button, Icon, PRIMARY } from 'react-native-material-design';

import config from '../config';
import DestinationSearchBox from './destinationSearchBox';

import {actorTypeChange} from '../actions/authActions';
import {updateLocation, destinationsSelect} from '../actions/locationActions';

var {width} = Dimensions.get('window');

class Home extends Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.dispatch(updateLocation(position.coords));
      },
      (error) => {alert(JSON.stringify(error))},
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
        this.props.dispatch(updateLocation(position.coords));
    });
  }

  onDestinationSelect(destination) {
    this.props.dispatch(destinationsSelect(destination));
  }

  onActorTypeChange(type) {
    this.props.dispatch(actorTypeChange(type));
  }

  onConfirm() {

  }

  onCancel() {

  }

  render() {
    let polylineArray;
    let route = null;
    let latitude = this.props.position.coords.latitude;
    let longitude = this.props.position.coords.longitude;
    let latitudeDelta = 0.01;
    let longitudeDelta = 0.01;
    let isClient = this.props.auth.actorType == 'rider';
    let confirmButtonText = isClient ? 'Send order' : 'Accept';
    let cancelButtonText = isClient ? 'Cancel' : 'Decline';

    if (this.props.position.trip && this.props.position.trip.routes.length) {
      route = this.props.position.trip.routes[0];
      latitudeDelta = longitudeDelta = Math.max(route.bounds.northeast.lat - route.bounds.southwest.lat,
                                                route.bounds.northeast.lng - route.bounds.southwest.lng) * 1.1;
      latitude = (route.bounds.northeast.lat + route.bounds.southwest.lat) / 2;
      longitude = (route.bounds.northeast.lng + route.bounds.southwest.lng) / 2;

      polylineArray =  polyline.decode(this.props.position.trip.routes[0].overview_polyline.points).map((pair) => {
        return {
          latitude: pair[0],
          longitude: pair[1]
        };
      });
    }

    return (
      <View style={styles.container}>
        <MapView style={styles.map}
                 initialRegion={{
                   latitude: latitude,
                   longitude: longitude,
                   latitudeDelta: latitudeDelta,
                   longitudeDelta: longitudeDelta,
                   }}
                region={{
                   latitude: latitude,
                   longitude: longitude,
                   latitudeDelta: latitudeDelta,
                   longitudeDelta: longitudeDelta,
                }}
        >
        <MapView.Marker
          coordinate={{  
            latitude: this.props.position.coords.latitude,
            longitude: this.props.position.coords.longitude,
          }}
          title={"You are here"}
          description={"HERE"}
          image={require('../images/me.png')}
        />
        {route && <MapView.Marker coordinate={{
                                    latitude: route.legs[0].end_location.lat,
                                    longitude: route.legs[0].end_location.lng
                                  }}
                                  title={"Destination"}
                                  description={route.legs[0].end_address} />}
        {polylineArray && <MapView.Polyline strokeWidth={2}
                                            coordinates={polylineArray} />}
        </MapView>
        <View style={styles.destinationInputBox}>
          {isClient && <DestinationSearchBox onSelect={this.onDestinationSelect.bind(this)}/>}
        </View>
        <View style={styles.actions}>
          <View style={{width: width / 2}}>
            <RadioButtonGroup selected={this.props.auth.actorType}
                              items={[{value: 'rider', label: 'Rider'}, {value: 'driver', label: 'Driver'}]}
                              onSelect={this.onActorTypeChange.bind(this)}/>
          </View>
          <View style={{width: width / 2}}>
            {route && <Button onPress={this.onConfirm.bind(this)}
                              theme="dark"
                              primary="paperLightBlue"
                              raised={true}
                              text={confirmButtonText}/>}
            {route && <Button onPress={this.onCancel.bind(this)}
                              theme="dark"
                              primary="paperRed"
                              raised={true}
                              text={cancelButtonText}/>}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
 destinationInputBox: {
    flex: 1,
   ...StyleSheet.absoluteFillObject
 },
 actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
 },
 orderActions: {
    flex: 1,
 }
});

export default connect(state => ({
  auth: state.auth,
  position: state.position,
}))(Home);
