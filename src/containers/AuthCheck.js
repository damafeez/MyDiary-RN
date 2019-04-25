import React, { Component } from "react";
import {connect} from 'react-redux';
import {
  View,
  ActivityIndicator,
} from "react-native";
import { colors, reusable } from "../styles/base";

class CheckAuth extends Component {
  componentDidMount() {
    this.authNavigation();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.authCheckComplete !== this.props.authCheckComplete) {
      this.authNavigation();
    }
  }
  authNavigation() {
    const {authCheckComplete, user, navigation} = this.props;
    if (authCheckComplete) navigation.navigate(user && user.token ? 'App' : 'Auth');
  }
  render() {
    return (
      <View
        style={[reusable.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  authCheckComplete: state.auth.authCheckComplete,
});

export default connect(mapStateToProps)(CheckAuth);
