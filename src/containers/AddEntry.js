import React, { Component } from "react";
import { connect } from 'react-redux';
import eventEmitter from '../services/eventEmitter';
import { createEntry, updateEntry } from '../store/actions/entries';
import { activateReadModal } from '../store/actions/ui';
import AddEntry from '../components/home/AddEntry';

class SingleEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      mode: 'create',
      index: null,
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
    const { index, navigation } = this.props;
    const { index: stateIndex, mode: stateMode } = this.state;
    const mode = navigation.getParam('mode', 'create');
    this.showReadModal = navigation.getParam('showReadModal', true);

    if (index !== stateIndex || mode !== stateMode) {
      this.setState({
        mode,
        index,
      });
      setTimeout(() => {
        this.reset(false);
      }, 100);
    }
    eventEmitter.on('Action Button Clicked', () => {
      this.handleActionButtonClick();
    });
    eventEmitter.on('Action Button Long Clicked', () => {
      const { _activateReadModal } = this.props;
      const editMode = this.state.mode === 'edit';
      this.reset(editMode);
      editMode && this.showReadModal && _activateReadModal();
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
  async handleActionButtonClick() {
    const { _createEntry,
      _updateEntry,
      _activateReadModal,
      loading,
      index,
      entries,
    } = this.props;
    const { title, body, mode } = this.state;
    const { id } = entries[index] || {};

    if (loading) return;
    let response = {};
    if (mode === 'create') {
      response = await _createEntry({ title, body });
    } else if (mode === 'edit') {
      response = await _updateEntry({ index, id, title, body });
    }
    if (response.success) {
      this.reset();
      return this.showReadModal && _activateReadModal()
    }
    alert(response.error);
  }
  handleTextChange(key, value) {
    this.setState({[key]: value});
  }
  trimInput(key) {
    this.setState(((prevState) => ({[key]: prevState[key].trim()})));
  }
  reset(clear = true) {
    const { mode } = this.state;
    const { entries, index, navigation, } = this.props;
    const { title, body } = entries[index] || {};
    const shouldEmpty = clear || mode !== 'edit';
    this.setState({
      title: shouldEmpty ? '' : title,
      body: shouldEmpty ? '' : body,      
    });
    if (clear){
      this.setState({
        index: null,  
      });
      navigation.navigate('Entries');
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
  _updateEntry: updateEntry,
  _activateReadModal: activateReadModal,
})(SingleEntry);
