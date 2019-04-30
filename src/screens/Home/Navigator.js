import React from "react";
import { createBottomTabNavigator } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import AddEntryButton from '../../components/AddEntryButton';
import Entries from './Entries';
import SingleEntry from './SingleEntry';
import Profile from './Profile';
import { colors } from "../../styles/base";

const TabNavigator = createBottomTabNavigator({
  Entries,
  SingleEntry,
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
        case 'SingleEntry':
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
  },
});

export default TabNavigator;
