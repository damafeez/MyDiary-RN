import React, { Component } from "react";
import { 
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import ProtectScreen from '../hoc/ProtectScreen';
import {colors, padding, reusable} from '../styles/base';
import IntroScroll from '../components/intro/Scroller';

class Intro extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <ProtectScreen type="redirectOnToken">
        <View style={[reusable.container, {padding: padding.md}]}>
          <SafeAreaView style={{flex: 1}}> 
            <View style={reusable.innerContainer}>
              <IntroScroll />
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('SignUp')} style={reusable.button}>
                  <Text style={{color: 'white', fontWeight: '600'}}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={[reusable.button, {backgroundColor: 'transparent', borderColor: '#C4C4C4', borderWidth: 1}]}>
                  <Text style={{color: colors.secondary, fontWeight: '600'}}>Login</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </ProtectScreen>
    );
  }
}
export default Intro;
