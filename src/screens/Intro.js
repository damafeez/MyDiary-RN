import React, { Component } from "react";
import { 
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import {colors, reusable} from '../styles/base';
import IntroScroll from '../components/intro/Scroller';

class Intro extends Component {
  render() {
    return (
      <View style={reusable.container}>
        <IntroScroll />
        <TouchableHighlight onPress={() => this.props.navigation.navigate('SignUp')} style={reusable.button}>
            <Text style={{color: 'white', fontWeight: '600'}}>Create Account</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Login')} style={[reusable.button, {backgroundColor: 'transparent', borderColor: '#C4C4C4', borderWidth: 1}]}>
            <Text style={{color: colors.secondary, fontWeight: '600'}}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default Intro;

const styles = StyleSheet.create({
  scrollIndicator: {
    width: 6,
    height: 6,
    backgroundColor: colors.tertiary,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  scrollIndicatorActive: {
    backgroundColor: colors.primary,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
  }
});
