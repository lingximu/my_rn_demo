import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';

export default class HomeScreen extends Component {
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title='Go to modal'
          onPress={() => this.props.navigation.navigate('Modal')}
        />
      </View>
    );
  }
}
