import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button, Image
} from 'react-native';
import FitImage from 'react-native-fit-image';
import { inject, observer } from 'mobx-react/native';

@inject('cartStore')
@observer
export default class ItemDetail extends React.Component {
  render () {
    const fruit = this.props.navigation.state.params;
    const {id, price, name, image: {url}, count} = fruit;
    return (
      <View key={id} style={styles.container}>
        <FitImage source={{uri: url}} />
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

const styles = StyleSheet.create({
  container: { flex: 1 }
})
;
