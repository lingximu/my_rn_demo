import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';

const Line = (props) => {
  return (
    <Text style={styles.line}>{props.text}</Text>
  );
};

export default class MineScreen extends React.Component {
  render () {
    return (
      <View style={styles.root}>
        <Line text='作者简介' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  line: {
    marginTop: 15,
    fontSize: 18
  }
})
;
