import React from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";
import ProtectScreen from '../../hoc/ProtectScreen';

const Entries = (props) => (
  <ProtectScreen  type="redirectOnNoToken" {...props}>
    <View style={styles.container}>
      <Text>Entries</Text>
    </View>
  </ProtectScreen>
);
export default Entries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
