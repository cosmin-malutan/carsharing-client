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
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {updateLocation} from '../actions/locationActions';

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

  componentWillReceiveProps(props) {
    //debugger;
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
                  longitudeDelta: 0.05
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
        <View style={styles.destinationInput}>
            <GooglePlacesAutocomplete placeholder='Search'
                                      minLength={2} // minimum length of text to search
                                      autoFocus={false}
                                      listViewDisplayed='auto'    // true/false/undefined
                                      fetchDetails={true}
                                      renderDescription={(row) => row.terms[0].value} // display street only
                                      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                        console.log(data);
                                        console.log(details);
                                      }}
                                      getDefaultValue={() => {
                                        return ''; // text input default value
                                      }}
                                      query={{
                                        // available options: https://developers.google.com/places/web-service/autocomplete
                                        key: 'AIzaSyDc3Ez57UyPlbJ0glDFF6n1DorZFVjjQnk',
                                        language: 'en', // language of the results
                                      }}
                                      styles={{
                                        description: {
                                          fontWeight: 'bold',
                                        },
                                        predefinedPlacesDescription: {
                                          color: '#1faadb',
                                        },
                                      }}
                                      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                                      enablePoweredByContainer={false} />
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
 destinationInput: {
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