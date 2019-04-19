import React, { Component } from "react";
import {View, Text, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { colors, padding } from "../styles/base";

class Header extends Component {
  render() {
    return (
      <SafeAreaView style={{backgroundColor: colors.background}}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
          <View style={{flexDirection: 'row', padding: padding.sm, alignItems: "center"}}>
            <Feather style={{marginRight: 5, fontSize: 20, color: colors.secondary}} name="chevron-left" /><Text style={{color: colors.secondary}}>Back</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}
export default Header;
