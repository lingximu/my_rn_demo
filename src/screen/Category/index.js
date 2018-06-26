
import React from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import FruitItems from '../../compose/FruitItems';
const ScrollableTabView = require('react-native-scrollable-tab-view');

export default class CategoryScreen extends React.Component {
  render () {
    return (
      <Query
        query={gql`
          {
            categories{
              id
              name
              fruits{
                id
                name
                price
                count
                image{
                  url
                }
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :(error.message)</Text>;
          const items = data.categories.map(({ name, id, fruits }) => (
            <FruitItems key={id} tabLabel={name} items={fruits} navigation={this.props.navigation} />
          ));
          return <ScrollableTabView>
            {items}
          </ScrollableTabView>;
        }}
      </Query>
    );
  }
}
