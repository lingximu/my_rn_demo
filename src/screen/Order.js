import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';

export default class ItemDetail extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>ItemDetail</Text>
        <Button
          title='Go to Details'
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}
