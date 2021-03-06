import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { View } from 'react-native';

import reducer from '../reducers';
import Components from '../components/index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

global.initAutocomplete = () => { debugger; }

export default class Index extends Component {
  render() {
    return (
      <View style={{flex:1}}>
      <Provider store={store}>
        <Components/>
      </Provider>
      </View>);
  }
}