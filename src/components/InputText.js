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
          onKeyPress={this.props.handleKeyPress}
          value={this.props.value}
          style={{fontSize: 17,
            paddingVertical: 10, fontWeight: active ? '500' : '400', letterSpacing: 3}}
            placeholderTextColor={active ? colors.primary : colors.secondary}
          placeholder={this.props.placeholder} />
      </View>
    );
  }
}
export default InputText;
