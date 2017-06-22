import React, { Component } from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import config from '../config';

export default class DestinationSearchBox extends Component {
  render () {
    return <GooglePlacesAutocomplete placeholder='Search'
                                     minLength={3} // minimum length of text to search
                                     autoFocus={false}
                                     listViewDisplayed='auto'    // true/false/undefined
                                     fetchDetails={true}
                                     renderDescription={(row) => row.terms[0].value} // display street only
                                     onPress={this.props.onSelect}
                                     getDefaultValue={() => ''}
                                     query={{
                                        key: config.GOOGLE_API_KEY,
                                        language: 'ro', // language of the results
                                    }}
                                    styles={{
                                      predefinedPlacesDescription: {
                                        color: '#1faadb',
                                      },
                                      listView: {
                                        backgroundColor: '#fff'
                                      }
                                    }}
                                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                                    enablePoweredByContainer={false} />
  }
}
