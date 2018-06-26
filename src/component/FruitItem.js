import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';
import theme from '../config/theme';

const {width} = Dimensions.get('window');

const FruitItem = ({onPress, imageUrl, name, price}) => {
  return <TouchableOpacity onPress={() => onPress && onPress()} >
    <View style={styles.container}>
      <Image source={{
        uri: imageUrl
      }} style={styles.image} />
      <Text>{name}</Text>
      <Text>￥ {price}/500g</Text>
    </View>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexWrap: 'wrap',

    width: (width - 40) / 2,
    height: 150,

    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,

    borderRadius: 4,
    backgroundColor: theme.background
  },
  image: {
    width: 100,
    height: 100
  }
});

export default FruitItem;
