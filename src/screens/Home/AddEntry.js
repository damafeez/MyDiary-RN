import React from "react";
import ProtectScreen from '../../hoc/ProtectScreen';
import AddEntry from '../../containers/AddEntry';

const SingleEntry = (props) => (
  <ProtectScreen  type="redirectOnNoToken">
    <AddEntry {...props}/>
  </ProtectScreen>
)

export default SingleEntry;
