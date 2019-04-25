import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import CheckAuth from './containers/AuthCheck';
import Intro from './screens/Intro';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Header from './components/Header';
import HomeNavigator from './screens/Home/Navigator';

const AppStack = createStackNavigator({Home: HomeNavigator},
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
    initialRouteName: 'CheckAuth'
  }
));
