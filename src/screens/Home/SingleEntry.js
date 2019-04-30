import React, { Component } from "react";
import ProtectScreen from '../../hoc/ProtectScreen';
import SingleEntryContainer from '../../containers/SingleEntry';
import eventEmitter from '../../services/eventEmitter';

class SingleEntry extends Component {
  static navigationOptions() {
    return {
      tabBarOnPress({defaultHandler}) {
        eventEmitter.emit('Action Button Clicked');
        defaultHandler()
      },
    };
  }
  render() {
    return (
      <ProtectScreen  type="redirectOnNoToken">
        <SingleEntryContainer {...this.props}/>
      </ProtectScreen>
    );
  }
}
export default SingleEntry;
