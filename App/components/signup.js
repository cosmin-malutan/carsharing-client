import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';
import {connect} from 'react-redux';
import { Button, Icon } from 'react-native-material-design';
import TransparentButton from 'react-native-button/Button';

import * as types from '../actions/actionTypes';
import {signup} from '../actions/authActions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  componentDidMount() {
    if (this.props.auth.authenticated) {
      this.props.navigator.push({id: 'home'});
    }
  }

  componentWillReceiveProps(props) {
    if (props.auth.authenticated) {
      props.navigator.push({id: 'home'});
    }
  }

  signup() {
    this.props.dispatch(signup(this.state.email, this.state.name, this.state.password));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image resizeMode="contain"
                 source={require('../images/signup.png')}
                 style={styles.topContainerBackground}>
            <View style={styles.topContainerMenu}>
              <TransparentButton style={styles.loginButton} 
                                 onPress={() => this.props.navigator.push({id: 'login'})}
                                color='#841584'>
                Login
              </TransparentButton>
            </View>
            <View style={styles.topContainerBody}>
            </View>
          </Image>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomContainerRow}>
            <TextInput  underlineColorAndroid='#fff'
                      style={styles.input}
                      onChangeText={(email) => this.setState({email})}
                      value={this.state.email}
                      keyboardType='email-address'
                      placeholder='Email'
            />
          </View>
          <View style={styles.bottomContainerRow}>
            <TextInput underlineColorAndroid='#fff'
                      style={styles.input}
                      onChangeText={(name) => this.setState({name})}
                      value={this.state.name}
                      placeholder='Full name'
            />
          </View>
          <View style={styles.bottomContainerRow}>
            <TextInput underlineColorAndroid='#fff'
                      style={styles.input}
                      onChangeText={(password) => this.setState({password})}
                      value={this.state.password}
                      placeholder='Password'
                      secureTextEntry
            />
          </View>
          <View style={styles.bottomContainerRow}>
            <Button onPress={this.signup.bind(this)}
                    theme="dark"
                    primary="paperLightBlue"
                    style={styles.input}
                    raised={true}
                    text='Signup'>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1
  },
  topContainerMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  topContainerBackground: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  },
  topContainerBody: {
    flex: 5
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 2,
    backgroundColor: '#fff', 
    borderColor: 'gray',
    borderWidth: 1
  },
  loginButton: {
    color: '#fff',
    backgroundColor:'#20b2aa',
    padding: 5,
    margin: 10
  },
  bottomContainer: {
    flex: 1,
    padding: 40,
    backgroundColor: '#d5d5d5',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainerRow: {
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    flex: 1
  }
});

export default connect(state => ({
  auth: state.auth,
}))(Signup);