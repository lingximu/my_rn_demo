import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import FitImage from 'react-native-fit-image';
import Bottom from './Bottom';
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
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>￥ {price}/500g</Text>
          </View>
          <View style={styles.bottomTextBox}>
            <TouchableOpacity onPress={this.increase(id)}>
              <Text style={styles.text}>+</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{count}</Text>
            <TouchableOpacity onPress={this.decrease(id)}>
              <Text style={styles.text}>-</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.delete(id)}>
              <Text style={styles.text}>删</Text>
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
      items = (
        <View style={styles.empty}>
          <Text>购物车为空！赶快去<Text style={styles.goHome} onPress={() => this.props.navigation.navigate('Home')}>添加商品</Text>吧！</Text>
        </View>
      );
    } else {
      items = cartFruits.map(({id, count, selected}) => {
        const f = allFruits.find(f => f.id === id);
        return <Item key={id} fruit={f} id={id} count={count} selected={selected} />;
      });
    }
    return (
      <View style={styles.root}>
        <View style={styles.items}>
          {items}
        </View>
        <Bottom style={styles.bottom} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between'
  },
  items: {
    flex: 1
  },
  bottom: {
    alignSelf: 'flex-end'
  },
  container: {
    marginTop: 3,
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
    width: 130,
    borderRadius: 65
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
  },
  text: {
    paddingLeft: 5,
    paddingRight: 5
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  goHome: {
    color: 'green'
  }
});
