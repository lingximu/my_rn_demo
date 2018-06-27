import Swiper from 'react-native-swiper';
import React, {Component} from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  img: {
    flex: 1
  }
});

/**
 * 渲染轮播图
 * @param {obj[]}  images - 图片,如 [{name,uri,href}]
 */
export default class FruitsSwiper extends Component {
  render () {
    const {images, navigation} = this.props;
    debugger; /* eslint-disable-line */
    return (<Swiper showsButtons>
      {
        images.map((img) => {
          console.log(' img.fruit.id', img.fruit && img.fruit.id, 'img', img);
          if (img.fruit) {
            return <TouchableOpacity style={styles.container} key={'touch' + img.fruit.id} onPress={() => { navigation.navigate('ItemDetail', img.fruit); }} >
              <Image source={{uri: img.uri}} style={styles.img} />
            </TouchableOpacity>;
          } else { return <Image key={'img' + img.id} source={{uri: img.uri}} style={styles.img} />; }
        })
      }
    </Swiper>);
  }
}
