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
@observer
export default class Bottom extends Component {
  constructor (props) {
    super(props);
    this.pay = this.pay.bind(this);
    this.toggleAllSelect = this.toggleAllSelect.bind(this);
  }
  toggleAllSelect () {
    this.props.cartStore.toggleAllSelect();
  }
  pay () {
    console.log('触发了 pay 函数');
  }
  render () {
    const {allSelected, totalMoney} = this.props.cartStore;
    return (
      <View style={styles.root}>
        <TouchableOpacity onPress={this.toggleAllSelect} style={styles.radio}>
          <Image source={allSelected ? radioSelected : radioNormal} />
          <Text style={styles.text}>全选</Text>
        </TouchableOpacity>
        <View style={styles.textBox}>
          <Text>
            ￥{totalMoney}
          </Text>
          <TouchableOpacity onPress={this.pay}>
            <Text style={styles.text}>
              付款
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#aa954e',
    alignItems: 'center',
    height: 40
  },
  radio: {
    marginLeft: 10,
    width: 40,
    flexDirection: 'row'
  },
  text: {
    marginLeft: 5
  },
  textBox: {
    marginRight: 30,
    flexDirection: 'row'
  }
});
