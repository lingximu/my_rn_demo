import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import FitImage from 'react-native-fit-image';
const radioSelected = require('../../img/radio_selected.png');
const radioNormal = require('../../img/radio_normal.png');

@inject('cartStore')
class Item extends Component {
  constructor (props) {
    super(props);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.delete = this.delete.bind(this);
  }
  toggleSelect () {
    const {id} = this.props;
    this.props.cartStore.toggleSelect(id);
  }
  increase (id) {
    return () => {
      this.props.cartStore.addFruit({
        id,
        count: 1
      });
    };
  }
  delete (id) {
    return () => {
      this.props.cartStore.delete(id);
    };
  }
  decrease (id) {
    return () => {
      this.props.cartStore.decrease(id);
    };
  }
  render () {
    const {fruit: {
      image: {url},
      name,
      price
    }, count, selected, id} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleSelect} style={styles.leftRadioBox}>
          <Image style={styles.leftRadio} source={selected ? radioSelected : radioNormal} />
        </TouchableOpacity>
        <Image source={{uri: url}} style={styles.middleImage} />
        <View style={styles.rightBox}>
          <View style={styles.intro}>
            <Text>{name}</Text>
            <Text>￥ {price}/500g</Text>
          </View>
          <View style={styles.bottomTextBox}>
            <TouchableOpacity onPress={this.increase(id)}>
              <Text>+</Text>
            </TouchableOpacity>
            <Text>{count}</Text>
            <TouchableOpacity onPress={this.decrease(id)}>
              <Text>-</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.delete(id)}>
              <Text>删</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

@inject('cartStore')
@observer
export default class Cart extends React.Component {
  render () {
    const {fruits: allFruits, cartStore: {fruits: cartFruits}} = this.props;
    let items;
    if (cartFruits.length === 0) {
      items = <Text>购物车为空！赶快去添加商品吧！</Text>;
    } else {
      items = cartFruits.map(({id, count, selected}) => {
        const f = allFruits.find(f => f.id === id);
        return <Item key={id} fruit={f} id={id} count={count} selected={selected} />;
      });
    }
    return (
      <View>{items}</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 130
  },
  leftRadioBox: {
    margin: 5
  },
  leftRadio: {

  },
  middleImage: {
    height: 130,
    width: 130
  },
  rightBox: {
    flex: 1,
    height: 130,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  intro: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomTextBox: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
