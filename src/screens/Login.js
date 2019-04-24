import React from "react";
import LoginContainer from '../containers/Login';
import ProtectScreen from '../hoc/ProtectScreen';

export default (props) => (
  <ProtectScreen type="redirectOnToken" {...props}>
    <LoginContainer {...props} />
  </ProtectScreen>
);
