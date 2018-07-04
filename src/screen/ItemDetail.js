import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button, Image, TouchableOpacity, Dimensions, Animated
} from 'react-native';
import FitImage from 'react-native-fit-image';
import { inject, observer } from 'mobx-react/native';
const {height, width} = Dimensions.get('window');
const emptyCartImg = require('../img/cart.png');
const existCartImg = require('../img/cart2.png');
@inject('cartStore')
@observer
export default class ItemDetail extends React.Component {
  constructor (props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleNumAdd = this.handleNumAdd.bind(this);
    this.handleNumSubtract = this.handleNumSubtract.bind(this);
    this.state = {
      num: 1,
      scale: new Animated.Value(1)
    };
  }
  handleAddToCart () {
    this.state.scale.setValue(1.5);
    Animated.spring(
      this.state.scale,
      {
        toValue: 1,
        friction: 1
      }
    ).start();
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
      if (this.state.num === 0) { return <Text style={[styles.disable]}>加入购物车</Text>; } else {
        return (
          <TouchableOpacity onPress={this.handleAddToCart}>
            <Text style={styles.text} >加入购物车</Text>
          </TouchableOpacity>
        );
      }
    })();

    return (
      <View key={id} style={styles.container}>
        <View style={styles.imaWrapper}>
          <Image style={styles.image} source={{uri: url}} />
        </View>
        <View style={styles.operation}>
          <Text style={styles.text}>数量  {this.state.num}</Text>
          <TouchableOpacity>
            <Text style={styles.text} onPress={this.handleNumAdd}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text} onPress={this.handleNumSubtract}>-</Text>
          </TouchableOpacity>
          {addCart}
        </View>
        <View style={styles.message}>
          <View style={styles.block}>
            <Text>{count ? '有货' : '无货'}</Text>
          </View>
          <View style={styles.block}>
            <Text>{name}</Text>
          </View>
          <View style={styles.block}>
            <Text>￥{price}/500g</Text>
          </View>
        </View>
        <Animated.View style={[styles.cartImageWrapper, {transform: [{scale: this.state.scale}]}]}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CartModel')}>
            <Image style={[styles.cartImage]} source={existCartImg} />
            <View style={styles.textIcon}>
              <Text style={styles.textIconInner}>{this.props.cartStore.fruits.length}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1
  },
  imaWrapper: {
    paddingTop: 30,
    paddingBottom: 40,
    width,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 80
  },
  operation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    width: width - 25,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 40,
    backgroundColor: '#ab956e'
  },
  message: {
    marginTop: 10
  },
  block: {
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 3
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    color: 'white'
  },
  disable: {
    color: '#ccc'
  },
  cartImageWrapper: {
    position: 'absolute',
    right: 20,
    top: 20
  },
  cartImage: {
    width: 50,
    height: 50
  },
  textIcon: {
    position: 'absolute',
    left: 1,
    top: 5,
    borderRadius: 20,
    width: 20,
    height: 20,
    backgroundColor: '#ab956e',
    alignItems: 'center',
    justifyContent: 'center'

  },
  textIconInner: {
  }
})
;
