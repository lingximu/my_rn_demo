import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

@inject('cartStore')
@observer
class Cart extends React.Component {
  render () {
    const {fruits: allFruits, cartStore: {fruits: cartFruits}} = this.props;
    let items;
    if (cartFruits.length === 0) {
      items = <Text>购物车为空！赶快去添加商品吧！</Text>;
    } else {
      items = cartFruits.map(({id, count}, index) => {
        const f = allFruits.find(f => f.id === id);
        return <Text key={f.id}> 第{index}个；{JSON.stringify(f)}</Text>;
      });
    }
    return (
      <View>{items}</View>
    );
  }
}

export default class CartScreen extends React.Component {
  render () {
    return (
      <Query
        query={gql`
          {
            fruits{
              id
              name
              price
              image{
                url
              }
              count
            }
          }
        `}
      >
        {({loading, error, data}) => {
          if (loading) return <Text>loading</Text>;
          if (error) return <Text>error: {error.message}</Text>;
          return <Cart fruits={data.fruits} />;
        }}
      </Query>
    );
  }
}
