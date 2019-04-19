import React, { Component } from "react";
import { 
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { reusable, padding, colors } from "../styles/base";
import InputText from '../components/InputText';

class SignUp extends Component {
  render() {
    return (
      <View style={[reusable.container, {paddingTop: 0}]}>
        <Text style={reusable.headerText}>Welcome back, Boo Boo!</Text>
        <View style={{marginVertical: padding.xl, width: '100%'}}>
          <InputText placeholder="Username" />
          <InputText placeholder="Password" />
        </View>
        <KeyboardAvoidingView behavior="position">
          <TouchableHighlight style={[reusable.button, {marginVertical: padding.lg}]}>
              <Text style={{color: 'white', fontWeight: '600'}}>Login</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
        <View style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{color: colors.secondary, fontSize: 15}}>Don't have an account? </Text>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('SignUp')} ><Text style={{color: colors.primary, fontWeight: '600', fontSize: 15, padding: 5}}>Sign Up</Text></TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
export default SignUp;
