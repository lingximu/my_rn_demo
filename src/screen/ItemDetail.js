import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button, Image
} from 'react-native';
import FitImage from 'react-native-fit-image';
import { inject, observer } from 'mobx-react/native';

@inject('cartStore')
@observer
export default class ItemDetail extends React.Component {
  constructor (props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleNumAdd = this.handleNumAdd.bind(this);
    this.handleNumSubtract = this.handleNumSubtract.bind(this);
    this.state = {num: 1};
  }
  handleAddToCart () {
    console.log('trigger handleAddToCart');
    const {id} = this.props.navigation.state.params;
    const exist = this.props.cartStore.fruits.find(f => f.id === id);
    if (exist) {
      console.log('exist: ', exist);
      exist.count = exist.count + this.state.num;
    } else {
      this.props.cartStore.fruits.push({
        id, count: this.state.num
      });
    }
  }
  handleNumAdd () {
    this.setState({
      num: this.state.num + 1
    });
  }
  handleNumSubtract () {
    console.log('触发 handleNumSubtract');
    const last = this.state.num - 1;
    if (last < 0) { this.setState({num: 0}); } else { this.setState({num: last}); }
  }
  render () {
    const fruit = this.props.navigation.state.params;
    const {id, price, name, image: {url}, count} = fruit;
    console.log('render', this.state.num);
    return (
      <View key={id} style={styles.container}>
        <FitImage source={{uri: url}} />
        <View>
          <Text>数量{this.state.num}</Text>
          <Text style={styles.titleText} onPress={this.handleNumAdd}>+</Text>
          <Text style={styles.titleText} onPress={this.handleNumSubtract}>-</Text>
          <Text onPress={this.handleAddToCart}>加入购物车</Text>
        </View>
        <View>
          <Text>{count ? '有货' : '无货'}</Text>
          <Text>{name}</Text>
          <Text>￥{price}/500g</Text>
        </View>
        <Text onPress={() => this.props.navigation.navigate('CartModel')} >查看购物车</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
;
