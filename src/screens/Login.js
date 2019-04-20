import React, { Component } from "react";
import { 
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { reusable, padding, colors } from "../styles/base";
import InputText from '../components/InputText';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleTextChange(key, value) {
    this.setState({[key]: value});
  }
  render() {
    return (
      <View style={reusable.container}>
        <SafeAreaView style={{flex: 1}}>
          <View style={reusable.innerContainer}>
            <Text style={reusable.headerText}>Welcome back, Boo Boo!</Text>
            <View style={{marginVertical: padding.xl, width: '100%'}}>
              <InputText name="username" value={this.state.username} handleTextChange={this.handleTextChange} placeholder="Username" />
              <InputText name="password" value={this.state.password} handleTextChange={this.handleTextChange} placeholder="Password" />
            </View>
            <KeyboardAvoidingView behavior="position">
              <TouchableOpacity activeOpacity={0.8} style={[reusable.button, {marginVertical: padding.lg}]}>
                  <Text style={{color: 'white', fontWeight: '600'}}>Login</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{color: colors.secondary, fontSize: 15}}>Don't have an account? </Text>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('SignUp')} ><Text style={{color: colors.primary, fontWeight: '600', fontSize: 15, padding: 5}}>Sign Up</Text></TouchableWithoutFeedback>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
export default SignUp;
