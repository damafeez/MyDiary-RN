import React, {Component} from "react";
import {
  View,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import { connect } from 'react-redux';
import ProtectScreen from '../../hoc/ProtectScreen';
import { createEntry } from '../../store/actions/entries';
import { reusable, padding, colors } from "../../styles/base";
import eventEmitter from '../../services/eventEmitter';

class AddEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.componentDidFocus = this.componentDidFocus.bind(this);
    this.componentWillBlur = this.componentWillBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.truncate = this.truncate.bind(this);
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
    eventEmitter.on('Create Entry', () => {
      this.handleSubmit();
    });
  }
  componentWillBlur() {
    eventEmitter.removeAllListeners('Create Entry');

  }
  // 
  componentWillUnmount() {
    // unregister react-navigation events
    this.subs.forEach(sub => sub.remove())
  }

  static navigationOptions() {
    return {
      tabBarOnPress({defaultHandler}) {
        eventEmitter.emit('Create Entry');
        defaultHandler()
      },
    };
  }
  async handleSubmit() {
    const {_createEntry} = this.props;
    const {title, body} = this.state;
    const response = await _createEntry({title, body});
    console.warn(response);
  }
  handleTextChange(key, value) {
    this.setState({[key]: value});
  }
  truncate(key) {
    this.setState(prevState => ({
      [key]: prevState[key].trim()
    }));
  }
  render() {
    return (
      <ProtectScreen  type="redirectOnNoToken">
        <View style={reusable.container}>
          <ScrollView
            keyboardShouldPersistTaps='handled'>
            <ImageBackground
              source={require('../../assets/intro3.jpeg')}
              style={{
                height: 150,
                tintColor: 'black'
              }}
            >
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: padding.md,
                paddingBottom: padding.sm,
                backgroundColor: 'rgba(0, 0, 0, .3)',
                
              }}>
                <TextInput 
                  onBlur={() => this.truncate('title')}
                  value={this.state.title}
                  onChangeText={(value) => this.handleTextChange('title', value)}
                  multiline
                  placeholder="Enter title here"
                  placeholderTextColor="lightgray"
                  selectionColor="white"
                  style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 5,
                    padding: padding.md,
                    width: '100%',
                  }} />
    
              </View>
            </ImageBackground>
            <View style={{
              flex: 1,
            }}>
              <TextInput 
                onBlur={() => this.truncate('body')}
                value={this.state.body}
                onChangeText={(value) => this.handleTextChange('body', value)}
                multiline
                placeholder="What's on your mind?"
                placeholderTextColor="gray"
                selectionColor={colors.secondary}
                style={{
                  color: colors.secondary,
                  fontSize: 17,
                  textAlign: 'justify',
                  paddingHorizontal: padding.md,
                  paddingTop: padding.md,
                  paddingBottom: padding.xl,
                }} />
            </View>
          </ScrollView>
        </View>
      </ProtectScreen>
    );
  }
}
export default connect(null, {_createEntry: createEntry})(AddEntry);
