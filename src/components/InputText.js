import React, { Component } from "react";
import { 
  View,
  TextInput
} from "react-native";
import { colors } from "../styles/base";

class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    }
  }
  render() {
    let active = this.state.focused || this.props.value;
    return (
      <View
        style={{
          borderBottomColor: active ? colors.primary : colors.tertiary, borderBottomWidth: active ? 2 : 1.5,
          width: '100%', marginVertical: 15}}>
        <TextInput
          onFocus={() => this.setState({focused: true})}
          onBlur={() => this.setState({focused: false})}
          onChangeText={value => this.props.handleTextChange(this.props.name, value)}
          value={this.props.value}
          style={{
            fontSize: 17,
            paddingVertical: 8,
            fontWeight: this.props.value ? '600' : '400',
            color: colors.primary,
          }}
          secureTextEntry={this.props.secureTextEntry}
          textContentType={this.props.textContentType}
          autoCapitalize={this.props.autoCapitalize}
          placeholderTextColor={colors.secondary}
          placeholder={this.props.placeholder} />
      </View>
    );
  }
}
export default InputText;
