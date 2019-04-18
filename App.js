import React, { Component } from "react";
import {SafeAreaView} from 'react-native'
import AppContainer from './src/AppContainer';
import { colors } from "./src/styles/base";

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <AppContainer />
      </SafeAreaView>
    );
  }
}
