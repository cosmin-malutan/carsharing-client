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

  componentWillReceiveProps(props) {
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: 46.7765346,
            longitude: 23.603722899999998,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
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