import React, { Component } from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default class DestinationSearchBox extends Component {
  render () {
    return <GooglePlacesAutocomplete placeholder='Search'
                                     minLength={2} // minimum length of text to search
                                     autoFocus={false}
                                     listViewDisplayed='auto'    // true/false/undefined
                                     fetchDetails={true}
                                     renderDescription={(row) => row.terms[0].value} // display street only
                                     onPress={this.props.onSelect}
                                     getDefaultValue={() => {
                                        return ''; // text input default value
                                     }}
                                     query={{
                                        // available options: https://developers.google.com/places/web-service/autocomplete
                                        key: 'AIzaSyDc3Ez57UyPlbJ0glDFF6n1DorZFVjjQnk',
                                        language: 'en', // language of the results
                                    }}
                                    styles={{
                                      predefinedPlacesDescription: {
                                        color: '#1faadb',
                                      }
                                    }}
                                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                                    enablePoweredByContainer={false} />
  }
}
