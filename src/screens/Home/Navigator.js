import { createBottomTabNavigator } from 'react-navigation';
import Entries from './Entries';
import AddEntry from './AddEntry';
import Profile from './Profile';
import { colors } from "../../styles/base";
import AnimatedBar from '../../components/home/AnimatedBar';

const TabNavigator = createBottomTabNavigator({
  Entries,
  AddEntry,
  Profile,
},
{
  lazy: false,
  defaultNavigationOptions: () => ({
    tabBarComponent: AnimatedBar,
  }),
  tabBarOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.tertiary,
    showLabel: false,
  },
});

export default TabNavigator;
