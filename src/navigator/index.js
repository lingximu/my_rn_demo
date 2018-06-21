import { createBottomTabNavigator } from 'react-navigation';
// import { HomeStack, SettingsStack } from './stacks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DetailScreen, HomeScreen, SettingScreen } from '../screen';

import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';

export default createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingScreen
},{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
      }

      return <Ionicons name={iconName} size={25} color={tintColor} />;
    }
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray'
  }
});
