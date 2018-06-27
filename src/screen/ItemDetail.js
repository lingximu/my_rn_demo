import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button, Image
} from 'react-native';

export default class ItemDetail extends React.Component {
  render () {
    const fruit = this.props.navigation.state.params;
    const {id, price, name, image: {url}, count} = fruit;
    return (
      <View key={id} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{uri: url}} />
        <View>
          <Text>数量{0}</Text>
          <Text>+</Text>
          <Text>-</Text>
          <Text>加入购物车</Text>
        </View>
        <View>
          <Text>{count ? '有货' : '无货'}</Text>
          <Text>{name}</Text>
          <Text>￥{price}/500g</Text>
        </View>
      </View>
    );
  }
}
