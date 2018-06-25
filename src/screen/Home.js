import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export default class HomeScreen extends Component {
  render () {
    return (
      <Query
        query={gql`
          {
            fruits(likes:2){
              id
              name
              likes
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :()</Text>;
          const items = data.fruits.map(({ name, id, likes }) => (
            <View key={name}>
              <Text>
                {name} -- {likes}
              </Text>
            </View>
          ));
          return <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{fontSize: 30}}>likes 数大于等于2的水果</Text>
            {items}
          </View>;
        }}
      </Query>
    );
  }
}
