import React from "react";
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import {connect} from 'react-redux';
import {signout} from '../../store/actions/auth';
import ProtectScreen from '../../hoc/ProtectScreen';
import { reusable } from "../../styles/base";

const Profile = (props) => (
  <ProtectScreen type="redirectOnNoToken">
    <View style={[reusable.container, styles.container]}>
      <Text>Profile</Text>
      <TouchableOpacity onPress={props.signout}>
        <Text style={{padding: 20, color: 'blue'}}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  </ProtectScreen>
);
export default connect(null, {signout})(Profile);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});