import React, { Component } from 'react';
import {
  Image,
  View,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import TransparentButton from 'react-native-button/Button';

import {logout} from '../actions/authActions';

class Logout extends Component {
  render () {
    return  <View style={styles.logout}>
              <TransparentButton onPress={() => {this.props.dispatch(logout())}}>
                <Image style={styles.image}
                      source={require('../images/logout.png')}>
                </Image>
              </TransparentButton>
            </View>
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  },
  logout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10
  }
});

export default connect()(Logout);