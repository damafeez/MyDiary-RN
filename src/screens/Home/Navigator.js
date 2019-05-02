import React from "react";
import { createBottomTabNavigator } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import AddEntryButton from '../../components/AddEntryButton';
import Entries from './Entries';
import AddEntry from './AddEntry';
import Profile from './Profile';
import { colors } from "../../styles/base";
const TabNavigator = createBottomTabNavigator({
  Entries,
  AddEntry,
  Profile,
},
{
  lazy: false,
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'Entries':
          iconName = 'align-center'
          break;
        case 'Profile':
          iconName = 'user'
          break;
        case 'AddEntry':
          return <AddEntryButton focused={focused} />
        default:
          break;
      }
      return <Feather name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.tertiary,
    showLabel: false,
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      shadowOffset: { width: 5, height: -5 },
      shadowColor: 'rgba(0, 0, 0, 0.8)',
      shadowOpacity: 0.1,
      shadowRadius: 10,
    }
  },
});

export default TabNavigator;
