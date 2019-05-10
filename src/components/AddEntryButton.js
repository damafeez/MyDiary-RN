import React from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import {colors} from "../styles/base";

const AddEntryButton = ({focused, loading, entry}) => (
  <View activeOpacity={0.9} style={[
    styles.button,
    !loading && focused && styles.buttonFocused,
  ]}>
    {
      (() => {
        if(loading) return <ActivityIndicator size="small" color="white" />
        else return <Feather style={{fontSize: 17}} name={entry ? 'edit-2' : focused ? 'check' : 'plus'} color="white" />
      })()
    }
  </View>
);

const styles = StyleSheet.create({
  button: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: colors.secondary,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 5,
  },
  buttonFocused: {
    backgroundColor: colors.primary,
  }
});

const mapStateToProps = (state) => ({
  loading: state.entries.createEntryLoading,
});

export default connect(mapStateToProps)(AddEntryButton);
