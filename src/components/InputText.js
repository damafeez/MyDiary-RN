import React, { Component } from "react";
import { 
  View,
  TextInput
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { colors } from "../styles/base";

class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    }
    this.focusInput = this.focusInput.bind(this);
  }
  focusInput() {
    this._textInput.focus();
  }
  render() {
    let active = this.state.focused || this.props.value;
    return (
      <View style={{
        width: '100%',
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'baseline'
      }}>
        <View
          style={{
            borderBottomColor: active ? colors.primary : colors.tertiary, borderBottomWidth: active ? 1.5 : 1,
            flex: 1,
          }}>
          <TextInput
            onFocus={() => this.setState({focused: true})}
            onBlur={() => this.setState({focused: false})}
            onChangeText={value => this.props.handleTextChange(this.props.name, value)}
            value={this.props.value}
            ref={component => this._textInput = component}
            style={{
              fontSize: 17,
              paddingBottom: 8,
              paddingHorizontal: 0,
              paddingTop: 15,
              fontWeight: this.props.value ? '500' : '400',
              color: colors.primary,
            }}
            secureTextEntry={this.props.secureTextEntry}
            textContentType={this.props.textContentType}
            autoCapitalize={this.props.autoCapitalize}
            autoCorrect={this.props.autoCorrect}
            placeholderTextColor={colors.secondary}
            placeholder={this.props.placeholder} />
        </View>
        {!!this.props.icon && <Feather
          name={this.props.icon}
          onPress={this.focusInput}
          style={{
            marginLeft: 7,
            fontSize: 21,
            color: active ? colors.primary : colors.tertiary,
          }} />}
      </View>
    );
  }
}
export default InputText;
