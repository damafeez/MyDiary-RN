import React, { Component , Fragment} from "react";
import {connect} from 'react-redux';

class ProtectScreen extends Component {
  componentDidMount() {
    this.authRedirect();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.authRedirect();
    }
  }
  authRedirect() {
    const {user, type, navigation} = this.props;
    const hasToken = user && user.token;
    if (type === 'redirectOnNoToken' && !hasToken) navigation.navigate('Auth');
    if (type === 'redirectOnToken' && hasToken) navigation.navigate('Home');
  }
  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ProtectScreen);
