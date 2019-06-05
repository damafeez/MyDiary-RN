import React from "react";
import {
  View,
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';

const SwipeButtons = ({icon, color}) => (
  <View style={{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, }}>
    <Feather style={{
        color,
        fontSize: 25,
      }} name={icon} />
  </View>);

export default SwipeButtons;
