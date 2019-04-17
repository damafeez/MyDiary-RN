import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";

export class CheckAuth extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CheckAuth</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});