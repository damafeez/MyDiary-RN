import React from 'react';
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import {CheckAuth} from './helpers';
import Intro from './screens/Intro';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Home from './screens/Home';
import Header from './components/Header';

const AppStack = createStackNavigator({Home},
  {
    defaultNavigationOptions: {
      header: null
    },
  })
const AuthStack = createStackNavigator({Intro, SignUp, Login},
  {
    initialRouteName: 'Intro',
    headerMode: 'screen',
    defaultNavigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation} />,
    })
  })

export default createAppContainer(createSwitchNavigator(
  {
    CheckAuth: CheckAuth,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth'
  }
));
