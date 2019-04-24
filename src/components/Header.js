import React, { Component } from "react";
import {Text, TouchableOpacity, SafeAreaView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { colors, padding } from "../styles/base";

class Header extends Component {
  render() {
    return (
      <SafeAreaView style={{backgroundColor: colors.background}}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{flexDirection: 'row', padding: padding.sm, alignItems: "center", alignSelf: 'flex-start'}}
          onPress={() => this.props.navigation.goBack()}
        >
          <Feather style={{marginRight: 5, fontSize: 20, color: colors.secondary}} name="chevron-left" />
          <Text style={{color: colors.secondary}}>Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
export default Header;
