import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';

export default class MineScreen extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a mine!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title='go back'
        />
      </View>
    );
  }
}
