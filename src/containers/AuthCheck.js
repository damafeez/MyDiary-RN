import React, { Component } from "react";
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet
} from "react-native";

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
      <View style={styles.container}>
        <Text>Authenticating...</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  authCheckComplete: state.auth.authCheckComplete,
});

export default connect(mapStateToProps, null)(CheckAuth);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
