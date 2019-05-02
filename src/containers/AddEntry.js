import React, { Component } from "react";
import { connect } from 'react-redux';
import eventEmitter from '../services/eventEmitter';
import { createEntry } from '../store/actions/entries';
import AddEntry from '../components/home/AddEntry';

class SingleEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      mode: 'create'
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.componentDidFocus = this.componentDidFocus.bind(this);
    this.componentWillBlur = this.componentWillBlur.bind(this);
    this.handleActionButtonClick = this.handleActionButtonClick.bind(this);
    this.trimInput = this.trimInput.bind(this);
    this.reset = this.reset.bind(this);
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
    this.subs.forEach(sub => sub.remove());
  }
  async handleActionButtonClick() {
    const { _createEntry, loading } = this.props;
    const { title, body, mode } = this.state;
    if (loading || !title || !body) return;
    if (mode === 'create') {
      const response = await _createEntry({title, body});
      if (response.success) return this.reset(response.data.id);
      alert(response.error);
    }
  }
  handleTextChange(key, value) {
    this.setState({[key]: value});
  }
  trimInput(key) {
    this.setState(((prevState) => ({[key]: prevState[key].trim()})));
  }
  reset(id) {
    this.props.navigation.navigate('Entries', { activeEntry: id });
    this.setState({
      title: '',
      body: ''
    });
  }
  render() {
    const { title, body, mode } = this.state;
    return (
      <AddEntry
        title={title}
        body={body}
        handleTextChange={this.handleTextChange}
        trimInput={this.trimInput} mode={mode}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.entries.createEntryLoading,
});
export default connect(mapStateToProps, {_createEntry: createEntry})(SingleEntry);
