import React, {Component} from "react";
import {
  View,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import ProtectScreen from '../../hoc/ProtectScreen';
import { reusable, padding, colors } from "../../styles/base";

class AddEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.truncate = this.truncate.bind(this);
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
export default AddEntry;
