import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

import {connect} from 'react-redux';
import polyline from 'polyline';
import MapView from 'react-native-maps';

import DestinationSearchBox from './destinationSearchBox'
import {updateLocation, destinationsSelect} from '../actions/locationActions';

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

    this.onDestinationSelect = this.onDestinationSelect.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.position.trip) {
      // TODO: calculate region based on trip.routes[0].bounds and the delta
      // draw the polyline just decoded here;
      console.log('polyline points = ', polyline.decode(props.position.trip.routes[0].overview_polyline.points));
    }
  }

  onDestinationSelect(destination) {
    this.props.dispatch(destinationsSelect(destination));
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
                 initialRegion={{
                   latitude: this.props.position.coords.latitude,
                   longitude: this.props.position.coords.longitude,
                   latitudeDelta: 0.01,
                   longitudeDelta: 0.01,
                   }}
                region={{
                  latitude: this.props.position.coords.latitude,
                  longitude: this.props.position.coords.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01
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
        </MapView>
        <View style={styles.destinationInputBox}>
          <DestinationSearchBox onSelect={this.onDestinationSelect}/>
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
    padding: 5,
    paddingTop: 50,
    marginLeft: 10,
    marginRight: 10
 }
});

export default connect(state => ({
  auth: state.auth,
  position: state.position,
}))(Home);
