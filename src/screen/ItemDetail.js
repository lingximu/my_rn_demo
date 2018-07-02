import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button, Image, TouchableOpacity
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
    this.state = {num: 0};
  }
  handleAddToCart () {
    const {id} = this.props.navigation.state.params;
    this.props.cartStore.addFruit({
      id, count: this.state.num
    });
  }
  handleNumAdd () {
    this.setState({
      num: this.state.num + 1
    });
  }
  handleNumSubtract () {
    const last = this.state.num - 1;
    if (last < 0) { this.setState({num: 0}); } else { this.setState({num: last}); }
  }
  render () {
    const fruit = this.props.navigation.state.params;
    const {id, price, name, image: {url}, count} = fruit;
    const addCart = (() => {
      if (this.state.num === 0) { return <Text style={styles.disable}>加入购物车</Text>; } else {
        return (
          <TouchableOpacity>
            <Text onPress={this.handleAddToCart}>加入购物车</Text>
          </TouchableOpacity>
        );
      }
    })();
    console.log('render', this.state.num);
    return (
      <View key={id} style={styles.container}>
        <FitImage source={{uri: url}} />
        <View>
          <Text>数量{this.state.num}</Text>
          <TouchableOpacity>
            <Text style={styles.titleText} onPress={this.handleNumAdd}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.titleText} onPress={this.handleNumSubtract}>-</Text>
          </TouchableOpacity>
          {addCart}
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
  },
  disable: {
    color: '#ccc'
  }
})
;
