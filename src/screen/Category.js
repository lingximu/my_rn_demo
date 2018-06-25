
import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export default class CategoryScreen extends React.Component {
  render () {
    return (
      <Query
        query={gql`
          {
            fruits{
              id
              name
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :()</Text>;
          const items = data.fruits.map(({ name, id }) => (
            <View key={name}>
              <Text>
                {name}
              </Text>
            </View>
          ));
          return <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{fontSize: 24, color: 'yellow'}}>所有的水果</Text>
            {items}
          </View>;
        }}
      </Query>
    );
  }
}
