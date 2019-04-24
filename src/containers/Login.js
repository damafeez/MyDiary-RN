import React, { Component } from "react";
import { 
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {connect} from 'react-redux';
import { reusable, padding, colors } from "../styles/base";
import InputText from '../components/InputText';
import {login} from '../store/actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTextChange(key, value) {
    this.setState({[key]: value});
  }
  async handleSubmit() {
    const {error, ...userInfo} = this.state;
    const response = await this.props.login(userInfo);
    if (response.error) this.setState({error: response.error})
  }
  render() {
    const {
      username,
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
              <Text style={reusable.headerText}>Welcome back, Boo Boo!</Text>
              <View style={{marginVertical: padding.xl, width: '100%'}}>
                <InputText icon="user-check" autoCapitalize="none" textContentType="username" name="username" value={username} handleTextChange={this.handleTextChange} placeholder="Username" />
                <InputText icon="unlock" textContentType="password" secureTextEntry name="password" value={password} handleTextChange={this.handleTextChange} placeholder="Password" />
                <View style={{position: 'absolute', bottom: -30, right: 0,}}>
                  {!!error && <Text style={{paddingVertical: 5, color: '#ff5925', fontWeight: '500'}}>{error}</Text>}
                </View>
              </View>
              <KeyboardAvoidingView behavior="position">
                <TouchableOpacity disabled={auth.loginLoading} onPress={this.handleSubmit} activeOpacity={0.8} style={[reusable.button, {marginVertical: padding.lg}, auth.loginLoading ? reusable.disabledButton : {}]}>
                  {auth.loginLoading ?
                    <ActivityIndicator size="small" color="white" />
                    : <Text style={{color: 'white', fontWeight: '600'}}>Login</Text>}
                </TouchableOpacity>
              </KeyboardAvoidingView>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{color: colors.secondary, fontSize: 15}}>Don&apos;t have an account? </Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('SignUp')} ><Text style={{color: colors.primary, fontWeight: '600', fontSize: 15, padding: 5}}>Sign Up</Text></TouchableWithoutFeedback>
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

export default connect(mapStateToProps, {login})(Login);
