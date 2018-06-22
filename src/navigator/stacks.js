
import { DetailScreen, HomeScreen, SettingScreen, ModalScreen } from '../screen/index';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

export const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailScreen,
  Modal: ModalScreen
});

export const SettingsStack = createStackNavigator({
  Settings: SettingScreen,
  Details: DetailScreen
});
