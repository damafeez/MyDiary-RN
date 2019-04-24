import React, { Component } from "react";
import { 
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator
} from "react-native";
import {connect} from 'react-redux';
import { reusable, padding, colors } from "../styles/base";
import InputText from '../components/InputText';
import {signup} from '../store/actions/auth';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      fullName: '',
      email: '',
      password: '',
      error: ''
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTextChange(key, value) {
    this.setState({[key]: value});
  }
  async handleSubmit() {
    const {error, ...userInfo} = this.state;
    const response = await this.props.signup(userInfo);
    if (response.error) this.setState({error: response.error})
  }
  render() {
    const {
      username,
      fullName,
      email,
      password,
      error,
    } = this.state;
    const {
      navigation,
      auth,
    } = this.props;
    return (
      <View style={reusable.container}>
        <ScrollView
          contentContainerStyle={{padding: padding.md}}
          keyboardShouldPersistTaps='handled'>
          <SafeAreaView style={{flex: 1}}>
            <View
              style={reusable.innerContainer}>
              <Text style={reusable.headerText}>Glad to see you Awesome!</Text>
              <View style={{position: 'relative', marginVertical: padding.md, width: '100%'}}>
                <InputText icon="user" autoCorrect={false} textContentType="name" name='fullName' handleTextChange={this.handleTextChange} value={fullName} placeholder="Full Name" />
                <InputText icon="user-check" autoCapitalize="none" textContentType="username" handleTextChange={this.handleTextChange} name='username' value={username} placeholder="Username" />
                <InputText icon="at-sign" autoCapitalize="none" textContentType="emailAddress" handleTextChange={this.handleTextChange}  name='email' value={email} placeholder="Email" />
                <InputText icon="unlock" textContentType="password" secureTextEntry handleTextChange={this.handleTextChange}  name='password' value={password} placeholder="Password" />
                <View style={{position: 'absolute', bottom: -30, right: 0,}}>
                  {!!error && <Text style={{paddingVertical: 5, color: '#ff5925', fontWeight: '500'}}>{error}</Text>}
                </View>                
              </View>
              <KeyboardAvoidingView>
                <TouchableOpacity disabled={auth.signupLoading} onPress={this.handleSubmit} activeOpacity={0.8} style={[reusable.button, {marginVertical: padding.lg}, auth.signupLoading ? reusable.disabledButton : {}]}>
                {auth.signupLoading ?
                  <ActivityIndicator size="small" color="white" />
                  : <Text style={{color: 'white', fontWeight: '600'}}>Sign Up</Text>}
                </TouchableOpacity>
              </KeyboardAvoidingView>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{color: colors.secondary, fontSize: 15}}>Already have an account? </Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')} ><Text style={{color: colors.primary, fontWeight: '600', fontSize: 15, padding: 5}}>Sign In</Text></TouchableWithoutFeedback>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
 return {auth: state.auth}
};

export default connect(mapStateToProps, {signup})(SignUp);
