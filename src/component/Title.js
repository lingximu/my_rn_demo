
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';
import theme from '../config/theme';

const Title = ({text, textStyle, lineStyle}) => {
  return (<View style={[styles.lineStyle]}>
    <Text style={[styles.textStyle]}>{text}</Text>
  </View>);
};

const styles = StyleSheet.create({
  lineStyle: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: theme.color
  }
});

export default Title;
