import React, { Component } from "react";
import {View, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import AppContainer from './src/AppContainer';
import store from './src/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar
            barStyle="dark-content"
          />
          <AppContainer persistenceKey="NavigationState" />
        </View>
      </Provider>
    );
  }
}
