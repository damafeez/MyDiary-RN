import React, { Component } from "react";
import ScrollableTab from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import eventEmitter from '../services/eventEmitter';
import { createEntry } from '../store/actions/entries';
import Entry from '../components/home/SingleEntry';

class SingleEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create: {
        title: '',
        body: '',
      },
      update: {
        title: '',
        body: '',
      },
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.componentDidFocus = this.componentDidFocus.bind(this);
    this.componentWillBlur = this.componentWillBlur.bind(this);
    this.handleActionButtonClick = this.handleActionButtonClick.bind(this);
    this.trimInput = this.trimInput.bind(this);
  }
  componentDidMount() {
    // register react-navigation events
    this.subs = [
      this.props.navigation.addListener('didFocus', this.componentDidFocus),
      this.props.navigation.addListener('willBlur', this.componentWillBlur),
    ];
  }
  // custom react-navigation events
  componentDidFocus() {
    eventEmitter.on('Action Button Clicked', () => {
      this.handleActionButtonClick();
    });
  }
  componentWillBlur() {
    eventEmitter.removeAllListeners('Action Button Clicked');
  }
  // 
  componentWillUnmount() {
    // unregister react-navigation events
    this.subs.forEach(sub => sub.remove())
  }
  async handleActionButtonClick() {
    const { _createEntry } = this.props;
    const { create } = this.state;
    const { title, body } = create;
    const response = await _createEntry({title, body});
    alert(response.success || response.error);
  }
  handleTextChange(key, value, mode) {
    this.setState(((prevState) => {
      const inputs = {...prevState[mode]};
      inputs[key] = value;
      return {[mode]: inputs}
    }));
  }
  trimInput(key, mode) {
    this.setState(((prevState) => {
      const inputs = {...prevState[mode]};
      inputs[key] = prevState[mode][key].trim();
      return {[mode]: inputs}
    }));
  }
  render() {
    const { create, update } = this.state;
    return (
      <ScrollableTab prerenderingSiblingsNumber={1} renderTabBar={false} >
        <Entry
          title={create.title}
          body={create.body}
          handleTextChange={this.handleTextChange}
          trimInput={this.trimInput} mode="create"
        />
        <Entry
          title={update.title}
          body={update.body}
          handleTextChange={this.handleTextChange}
          trimInput={this.trimInput} mode="update" 
        />
      </ScrollableTab>
    );
  }
}

export default connect(null, {_createEntry: createEntry})(SingleEntry);
