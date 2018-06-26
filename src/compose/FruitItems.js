import React from 'react';
import FruitItem from '../component/FruitItem';
import { View, StyleSheet } from 'react-native';

const FruitItems = ({items = [], navigation}) => {
  return <View style={styles.container}>
    {
      items.map(({name, price, id, image: {url}}) => {
        const obj = arguments[0];
        return <FruitItem onPress={() => navigation.navigate('ItemDetail', obj)}
          name={name} price={price} imageUrl={url} key={id}
        />;
      })
    }
  </View>;
}
;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default FruitItems;
