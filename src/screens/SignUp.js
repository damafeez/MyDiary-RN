import React, { Component } from "react";
import { 
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { reusable, padding, colors } from "../styles/base";
import InputText from '../components/InputText';

class SignUp extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={[reusable.container, {paddingTop: 0}]}>
        <Text style={reusable.headerText}>Glad to see you Awesome!</Text>
        <View style={{marginVertical: padding.md, width: '100%'}}>
          <InputText placeholder="Full Name" />
          <InputText placeholder="Username" />
          <InputText placeholder="Email" />
          <InputText placeholder="Password" />
        </View>
        <KeyboardAvoidingView>
          <TouchableHighlight style={[reusable.button, {marginVertical: padding.lg}]}>
              <Text style={{color: 'white', fontWeight: '600'}}>Sign Up</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
        <View style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{color: colors.secondary, fontSize: 15}}>Already have an account? </Text>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Login')} ><Text style={{color: colors.primary, fontWeight: '600', fontSize: 15, padding: 5}}>Sign In</Text></TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
export default SignUp;
