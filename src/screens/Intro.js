import React, { Component } from "react";
import { 
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import {colors, padding} from '../styles/base';
import IntroScroll from '../components/intro/Scroller';

class Intro extends Component {
  render() {
    return (
      <View style={styles.container}>
        <IntroScroll />
        <TouchableHighlight style={styles.button}>
            <Text style={{color: 'white', fontWeight: '600'}}>Create Account</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.button, {backgroundColor: 'transparent', borderColor: '#C4C4C4', borderWidth: 1}]}>
            <Text style={{color: colors.secondary, fontWeight: '600'}}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    padding: padding.md,
  },
  button: {
    width: 300,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    backgroundColor: colors.primary,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#50555ac2',
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 3,
    marginVertical: 10
  },
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
