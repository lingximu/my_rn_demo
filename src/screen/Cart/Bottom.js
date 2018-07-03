import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image, Alert
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import FitImage from 'react-native-fit-image';
import Spinner from 'react-native-loading-spinner-overlay';

const radioSelected = require('../../img/radio_selected.png');
const radioNormal = require('../../img/radio_normal.png');
const paying = '支付中……';
const payed = '支付成功!欢迎下次光临!';

@inject('cartStore')
@observer
export default class Bottom extends Component {
  constructor (props) {
    super(props);
    this.pay = this.pay.bind(this);
    this.toggleAllSelect = this.toggleAllSelect.bind(this);
    this.cancelPay = this.cancelPay.bind(this);
    this.confirmPay = this.confirmPay.bind(this);
    this.clear = this.clear.bind(this);
    this.delaySpinner = this.delaySpinner.bind(this);
    this.state = {
      visible: false,
      loadText: paying
    };
  }
  toggleAllSelect () {
    this.props.cartStore.toggleAllSelect();
  }
  pay () {
    Alert.alert(
      '支付',
      `总计:￥ ${this.props.cartStore.totalMoney}`,
      [
        {text: '取消', onPress: () => this.cancelPay()},
        {text: '确定', onPress: () => this.confirmPay()}
      ],
      { cancelable: false }
    );
  }
  delaySpinner (visible, text, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({
          visible,
          loadText: text
        });
        resolve();
      }, delay);
    });
  }
  clear () {
    console.log('clear');
    this.props.cartStore.fruits = [];
  }
  confirmPay () {
    console.log('confirmPay');
    this.delaySpinner(true, paying, 10)
      .then(() => this.delaySpinner(true, payed, 2000))
      .then(() => this.delaySpinner(false, paying, 1000))
      .then(() => this.clear());
  }
  cancelPay () {
    console.log('cancelPay');
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
        <Spinner visible={this.state.visible} textContent={this.state.loadText} textStyle={{color: 'black'}} />
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
