import React, { Component } from "react";
import { 
  View,
  Text,
  Image,
  StyleSheet
} from "react-native";
import {colors, padding, dimensions} from '../../styles/base';

class IntroSplash extends Component {
  render() {
    return (
      <View style={{alignItems: "center", paddingHorizontal: padding.md, paddingVertical: dimensions.fullHeight < 812 ? padding.sm : padding.md}}>
        <View style={styles.introImage}>
          <Image style={{
            width: '100%',
            flex: 1,
            resizeMode: 'cover',
            borderRadius: 10
          }} source={this.props.image} />
        </View>
        <Text style={{fontSize: 22, marginVertical: 55, fontWeight: '500', color: colors.headerText}}>{this.props.title}</Text>
        <Text style={{textAlign: "center", color: colors.secondary, fontSize: 15, lineHeight: 20}}>{this.props.description}</Text>
      </View>
    );
  }
}
export default IntroSplash;

const styles = StyleSheet.create({
  introImage: {
    width: 270,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#50555ac2',
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 3,},
});