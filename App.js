import React, { Component } from "react";
import {SafeAreaView, StatusBar} from 'react-native'
import AppContainer from './src/AppContainer';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle="dark-content"
        />
        <AppContainer />
      </SafeAreaView>
    );
  }
}
