import React, { Component } from "react";
import { 
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { reusable, padding, colors } from "../styles/base";
import InputText from '../components/InputText';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      fullName: '',
      email: '',
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
        <ScrollView
          contentContainerStyle={{padding: padding.md}}
          keyboardShouldPersistTaps='handled'>
          <SafeAreaView style={{flex: 1}}>
            <View
              style={reusable.innerContainer}>
              <Text style={reusable.headerText}>Glad to see you Awesome!</Text>
              <View style={{marginVertical: padding.md, width: '100%'}}>
                <InputText textContentType="name" name='fullName' handleTextChange={this.handleTextChange} value={this.state.fullName} placeholder="Full Name" />
                <InputText autoCapitalize="none" textContentType="username" handleTextChange={this.handleTextChange} name='username' value={this.state.username} placeholder="Username" />
                <InputText autoCapitalize="none" textContentType="emailAddress" handleTextChange={this.handleTextChange}  name='email' value={this.state.email} placeholder="Email" />
                <InputText textContentType="password" secureTextEntry handleTextChange={this.handleTextChange}  name='password' value={this.state.password} placeholder="Password" />
              </View>
              <KeyboardAvoidingView>
                <TouchableOpacity activeOpacity={0.8} style={[reusable.button, {marginVertical: padding.lg}]}>
                    <Text style={{color: 'white', fontWeight: '600'}}>Sign Up</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{color: colors.secondary, fontSize: 15}}>Already have an account? </Text>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Login')} ><Text style={{color: colors.primary, fontWeight: '600', fontSize: 15, padding: 5}}>Sign In</Text></TouchableWithoutFeedback>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
export default SignUp;
