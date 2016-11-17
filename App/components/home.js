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
 

class Home extends Component {
  state = {coords: {
            latitude: 46.7765346,
            longitude: 23.6037229
          }
        };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({position});
    });
  }

  componentWillReceiveProps(props) {
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: this.state.coords.latitude,
            longitude: this.state.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        <MapView.Marker
          coordinate={{  
            latitude: this.state.coords.latitude,
            longitude: this.state.coords.longitude,
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
}))(Home);