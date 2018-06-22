import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';

export default class SettingScreen extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>SettingScreen</Text>
        <Button
          title='Go to Details'
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}
