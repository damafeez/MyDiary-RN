import React from "react";
import {View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {reusable, colors} from "../styles/base";

const AddEntryButton = ({focused}) => (
  <View activeOpacity={0.9} style={[reusable.button, {width: 45, height: 45, backgroundColor: focused ? '#43A047' : colors.primary}]}>
    <Feather style={{fontSize: 17}} name={focused ? 'check' : 'plus'} color="white" />
  </View>
);

export default AddEntryButton;
