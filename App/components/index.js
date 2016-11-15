import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Navigator,
  View
} from 'react-native';
import {connect} from 'react-redux';

import * as types from '../actions/actionTypes';
import {checkUser} from '../actions/authActions';

import Signup from './signup'
import Login from './login'
import Home from './home'

class Index extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    if (!this.props.auth.authenticated) {
      this.props.dispatch(checkUser());
    }
  }

  renderScene(route, navigator) {
    var {state,actions} = this.props;
    var routeId = route.id;

    switch(routeId) {
      case 'signup':
        return (
          <Signup {...this.props}
                navigator={navigator} />
        );
      case 'login':
        return (
          <Login {...this.props}
                navigator={navigator} />
        );
      case 'home':
        return (
          <Home {...this.props}
                navigator={navigator} />
        );
      default:
        return '';
    }
  }

  configureScene(route, routeStack) {
    var routeId = route.id;

    switch(routeId) {
      case 'signup':
        return Navigator.SceneConfigs.FloatFromLeft;
      case 'login':
        return Navigator.SceneConfigs.FloatFromRight;
      default:
        return Navigator.SceneConfigs.FloatFromRight;
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Navigator style={{flex: 1}}
                   ref={'NAV'}
                   initialRoute={{id: 'signup', name: 'signup'}}
                   configureScene={this.configureScene.bind(this)}
                   renderScene={this.renderScene.bind(this)}/>
      </View>
    )
  }
}


export default connect(state => ({
  auth: state.auth,
}))(Index);