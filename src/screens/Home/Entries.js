import React from "react";
import ProtectScreen from '../../hoc/ProtectScreen';
import EntriesContainer from '../../containers/Entries';

const Entries = (props) => (
  <ProtectScreen  type="redirectOnNoToken">
    <EntriesContainer {...props} />
  </ProtectScreen>
);
export default Entries;

