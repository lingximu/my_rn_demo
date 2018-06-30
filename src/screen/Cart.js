import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

@inject('cartStore')
@observer
export default class CartScreen extends React.Component {
  render () {
    const {fruits: cartFruits} = this.props.cartStore;

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
          const fruits = data.fruits;
          if (cartFruits.length === 0) {
            return <Text>购物车为空！赶快去添加商品吧！</Text>;
          } else {
            return cartFruits.map(({id, count}, index) => {
              const f = fruits.find(f => f.id === id);
              return <Text key={f.id}> 第{index}个；{JSON.stringify(f)}</Text>;
            });
          }
        }}
      </Query>
    );
  }
}
