import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

import {connect} from 'react-redux';
import MapView from 'react-native-maps';
 
import {updateLocation} from '../actions/locationActions';

class Home extends Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.dispatch(updateLocation(position.coords));
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
        this.props.dispatch(updateLocation(position.coords));
    });
  }

  componentWillReceiveProps(props) {
    debugger;
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
                 initialRegion={{
                   latitude: this.props.position.coords.latitude,
                   longitude: this.props.position.coords.longitude,
                   latitudeDelta: 0.05,
                   longitudeDelta: 0.05,
                   }}
                region={{
                  latitude: this.props.position.coords.latitude,
                  longitude: this.props.position.coords.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05}}
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
 }
});

export default connect(state => ({
  auth: state.auth,
  position: state.position,
}))(Home);