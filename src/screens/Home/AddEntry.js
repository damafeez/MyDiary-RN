import React, { Component } from "react";
import ProtectScreen from '../../hoc/ProtectScreen';
import AddEntry from '../../containers/AddEntry';
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
        <AddEntry {...this.props}/>
      </ProtectScreen>
    );
  }
}
export default SingleEntry;
