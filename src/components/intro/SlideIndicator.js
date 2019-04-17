import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";
import {colors} from '../../styles/base';

class IntroSlideIndicator extends Component {
  render() {
    return (
      <View style={[this.props.style, {flexDirection: 'row', justifyContent: 'center', paddingBottom: 50}]}>
        {[0, 1, 2].map(position => <View key={position} style={[styles.scrollIndicator, this.props.activeTab === position ? styles.scrollIndicatorActive : {}]}></View>)}
      </View>
    );
  }
}
export default IntroSlideIndicator;

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