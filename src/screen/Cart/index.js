import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Cart from './Cart';

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
          return <Cart navigation={this.props.navigation} fruits={data.fruits} />;
        }}
      </Query>
    );
  }
}
