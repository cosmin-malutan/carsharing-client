import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

import {connect} from 'react-redux';

import { Button, Icon, PRIMARY } from 'react-native-material-design';
import TransparentButton from 'react-native-button/Button';

import * as types from '../actions/actionTypes';
import {login} from '../actions/authActions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  componentWillReceiveProps(props) {
    if (props.auth.state == types.LOGIN_SUCCESSFUL) {
      props.navigator.push({id: 'home'});
    }
  }

  login() {
    this.props.dispatch(login(this.state.email, this.state.password))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TransparentButton style={styles.backButton} 
                  onPress={() => this.props.navigator.jumpBack()} 
                  color='#841584'>
            <Icon name='keyboard-arrow-left' color="#fff" size={50} />
          </TransparentButton>
          <Text style={styles.headerText}>LOGIN </Text>
          <TransparentButton style={styles.signupButton} 
                  onPress={() => this.props.navigator.push({id: 'signup'})}
                  color='#841584'>
            Signup
          </TransparentButton>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.containerRow}>
            <Text>
              {this.props.auth.state}
            </Text>
          </View>
          <View style={styles.containerRow}>
            <TextInput  underlineColorAndroid='#fff'
                      style={styles.input}
                      onChangeText={(email) => this.setState({email})}
                      value={this.state.email}
                      keyboardType='email-address'
                      placeholder='Email'
            />
          </View>
          <View style={styles.containerRow}>
            <TextInput underlineColorAndroid='#fff'
                      style={styles.input}
                      onChangeText={(password) => this.setState({password})}
                      value={this.state.password}
                      placeholder='Password'
                      secureTextEntry
            />
          </View>
          <View style={styles.containerRow}>
            <Button onPress={this.login.bind(this)}
                    theme="dark"
                    primary="paperLightBlue"
                    raised={true}
                    text='Login'/>
          </View>
          <View style={{flex: 5}}></View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    height: 50,
    backgroundColor: '#0c968f',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  bodyContainer: {
    flex: 11,
    backgroundColor: '#d5d5d5',
    padding: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 2,
    backgroundColor: '#fff', 
    borderColor: 'gray',
    borderWidth: 1
  },
  container: {
    flex: 1,
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row'
  },
  headerText: {
    flex: 5,
    padding: 5,
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff'
  },
  signupButton: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#20b2aa',
    padding: 5,
    paddingTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  backButton: {
    flex: 1,
    padding: 15
  }
});

export default connect(state => ({
  auth: state.auth,
}))(Login);