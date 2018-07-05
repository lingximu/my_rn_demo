import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import FruitItems from '../compose/FruitItems';
import Title from '../component/Title';
import FruitsSwiper from '../component/FruitsSwiper';

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
        {({ loading, error, data: {fruits}, refetch, networkStatus }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :(error.message)</Text>;

          const fruitImages = fruits.map((fruit) => {
            const {id, likes, name, image: {url}} = fruit;
            return {
              id, name, uri: url, fruit, likes
            };
          }).sort((before, after) => before.likes > after.likes);
          return <View style={styles.container}>
            <FruitsSwiper navigation={this.props.navigation} images={fruitImages.slice(0, 4)} />
            <Title text='精品水果' />
            <FruitItems onRefresh={refetch} refreshing={networkStatus === 4} items={fruits} navigation={this.props.navigation} />
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
