import React from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";
import ProtectScreen from '../../hoc/ProtectScreen';

const AddEntry = (props) => (
  <ProtectScreen  type="redirectOnNoToken" {...props}>
    <View style={styles.container}>
      <Text>AddEntry</Text>
    </View>
  </ProtectScreen>
);
export default AddEntry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
