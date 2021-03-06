import React from "react";
import SignUpContainer from '../containers/SignUp';
import ProtectScreen from '../hoc/ProtectScreen';

export default (props) => (
  <ProtectScreen type="redirectOnToken">
    <SignUpContainer {...props} />
  </ProtectScreen>
);
