import React, { Component } from "react";
import { connect } from 'react-redux';
import eventEmitter from '../services/eventEmitter';
import { createEntry } from '../store/actions/entries';
import { activateReadModal } from '../store/actions/ui';
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
    const mode = this.props.navigation.getParam('mode', 'create');
    this.setState({
      mode,
    });
    eventEmitter.on('Action Button Clicked', () => {
      this.handleActionButtonClick();
    });
    eventEmitter.on('Action Button Long Clicked', () => {
      this.reset(this.state.mode === 'edit');
    });
  }
  componentWillBlur() {
    eventEmitter.removeAllListeners('Action Button Clicked');
    eventEmitter.removeAllListeners('Action Button Long Clicked');
  }
  // 
  componentWillUnmount() {
    // unregister react-navigation events
    this.subs.forEach(sub => sub.remove());
  }
  componentDidUpdate(prevProps, prevState) {
    const { mode } = this.state;
    if (prevState.mode !== mode) {
      this.reset(false);
    }
  }

  async handleActionButtonClick() {
    const { _createEntry, loading } = this.props;
    const { title, body, mode } = this.state;
    if (loading || !title || !body) return;
    if (mode === 'create') {
      const response = await _createEntry({title, body});
      if (response.success) {
        return this.reset();
      }
      alert(response.error);
    }
  }
  handleTextChange(key, value) {
    this.setState({[key]: value});
  }
  trimInput(key) {
    this.setState(((prevState) => ({[key]: prevState[key].trim()})));
  }
  reset(clear = true) {
    const { mode } = this.state;
    const { entries, index, navigation, _activateReadModal } = this.props;
    const { title, body } = entries[index] || {};
    const shouldEmpty = clear || mode !== 'edit';
    this.setState({
      title: shouldEmpty ? '' : title,
      body: shouldEmpty ? '' : body,      
    });
    if (clear){
      navigation.navigate('Entries');
      mode === 'edit' && _activateReadModal();
    }
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
  entries: state.entries.entries,
  index: state.entries.currentEntry,
});
export default connect(mapStateToProps, {
  _createEntry: createEntry,
  _activateReadModal: activateReadModal,
})(SingleEntry);
