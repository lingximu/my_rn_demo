import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export default class CartScreen extends React.Component {
  render () {
    return (
      <Query
        query={gql`
          {
            cart(id:1){
              fruits{
                name
                price
                image{
                  url
                }
                category{
                  id
                  name
                }
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <Text>loading</Text>;
          if (error) return <Text>error: {error.message}</Text>;
          const items = data.cart.fruits.map(({name, price, image, category}) => {
            return <Text>
              {name} > {price} 元 > image: {image.url}
            </Text>;
          });
          return <View>
            <Text>购物车所有的物品如下</Text>
            {items}
          </View>;
        }}
      </Query>
    );
  }
}
