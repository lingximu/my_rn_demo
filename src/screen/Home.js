import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import FruitItems from '../compose/FruitItems';
import Title from '../component/Title';
export default class HomeScreen extends Component {
  render () {
    return (
      <Query
        query={gql`
          {
            fruits(likes:2){
              id
              name
              price
              likes
              image{
                url
              }
            }
          }
        `}
      >
        {({ loading, error, data: {fruits} }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :(error.message)</Text>;
          return <View style={styles.container}>
            {/* <Title text='瓜果推荐' /> */}
            <FruitItems items={fruits} navigation={this.props.navigation} />
          </View>;
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
;
