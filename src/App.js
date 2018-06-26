/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import { onError, Provider } from 'mobx-react';
import { YellowBox } from 'react-native';
import store from './store';
import config from './config';
import TabNavigator from './navigator';

import { DetailScreen, HomeScreen, SettingScreen } from './screen';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'VirtualizedList: missing keys for items']);

onError(error => {
  console.error(error);
});

const client = new ApolloClient({
  uri: config.graphqlEndpoint
});

export default class App extends Component {
  render () {
    return (
      <Provider {...store}>
        <ApolloProvider client={client}>
          <TabNavigator />
        </ApolloProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
