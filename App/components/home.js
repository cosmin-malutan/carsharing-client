import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

import {connect} from 'react-redux';

class Home extends Component {

  componentWillReceiveProps(props) {
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default connect(state => ({
  auth: state.auth,
}))(Home);