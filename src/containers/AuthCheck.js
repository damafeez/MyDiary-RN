import React from "react";
import { connect } from 'react-redux';
import {
  View,
  ActivityIndicator,
} from "react-native";
import { colors, reusable } from "../styles/base";

const CheckAuth = (props) => {
  const { authCheckComplete, user, navigation } = props;
  if (authCheckComplete) navigation.navigate(user && user.token ? 'App' : 'Auth');
  return (
    <View
      style={[reusable.container, {justifyContent: 'center', alignItems: 'center'}]}>
      <ActivityIndicator size="small" color={colors.primary} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  authCheckComplete: state.auth.authCheckComplete,
});

export default connect(mapStateToProps)(CheckAuth);
