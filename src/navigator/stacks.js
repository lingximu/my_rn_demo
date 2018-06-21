
import { DetailScreen, HomeScreen, SettingScreen } from '../screen';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

export const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailScreen
});

export const SettingsStack = createStackNavigator({
  Settings: SettingScreen,
  Details: DetailScreen
});
