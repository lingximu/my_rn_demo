import React from 'react';
import FruitItem from '../component/FruitItem';
import Title from '../component/Title';
import { View, StyleSheet, Text, FlatList } from 'react-native';

const FruitTwoItems = ({twoItems = [], navigation}) => {
  return <View style={{flex: 1, flexWrap: 'nowrap', flexDirection: 'row'}}>
    {
      twoItems.map(({name, price, id, image: {url}}) => {
        const obj = arguments[0];
        return <FruitItem
          onPress={() => navigation.navigate('ItemDetail', obj)}
          name={name} price={price} imageUrl={url} key={id}
        />;
      })
    }
  </View>;
};

const FruitItems = ({items = [], navigation}) => {
  const twoItemArr = [];
  let two = [];
  items.forEach((item, index) => {
    if (index % 2 === 1) {
      two.push(item);
      twoItemArr.push(two);
      two = [];
    } else {
      two.push(item);
    }
  });
  if (two.length !== 0) { twoItemArr.push(two); }

  return <View style={styles.box}>
    <Title text='精品瓜果' />
    <FlatList
      data={twoItemArr}
      renderItem={({item: two}) => {
        return <FruitTwoItems twoItems={two} navigation={navigation} />;
      }}
      style={styles.container}
    /></View>;
}
;

const styles = StyleSheet.create({
  box: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});

export default FruitItems;
