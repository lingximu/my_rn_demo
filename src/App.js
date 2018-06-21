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

import store from './store';
import config from './config';
import TabNavigator from './navigator';

import { DetailScreen, HomeScreen, SettingScreen } from './screen';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

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
