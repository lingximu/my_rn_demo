import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeScreen, CategoryScreen, CartScreen,
  MineScreen, ModalScreen, ItemDetailScreen } from '../screen/index';
import TabBarItem from '../component/TabBarItem';
import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';

const Tab = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: '主页',
      tabBarIcon: ({ focused, tintColor }) =>
        (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            selectedImage='http://img.lingximu.com/rn/homeSelect.png'
            normalImage='http://img.lingximu.com/rn/home.png'
          />
        )
    })
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: ({navigation}) => (
      {
        tabBarLabel: '分类',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            selectedImage='http://img.lingximu.com/rn2/categorySelect.png'
            normalImage='http://img.lingximu.com/rn2/category.png'
          />
        )
      }
    )
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: ({navigation}) => (
      {
        tabBarLabel: '购物车',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            selectedImage='http://img.lingximu.com/rn/cart11.png'
            normalImage='http://img.lingximu.com/rn/cart12.png'
          />
        )
      }
    )
  },
  Mine: {
    screen: MineScreen,
    navigationOptions: ({navigation}) => (
      {
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            selectedImage='http://img.lingximu.com/rn/mineSelect.png'
            normalImage='http://img.lingximu.com/rn/mine.png'
          />
        )
      }
    )
  }
}, {
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray'
  },
  initialRouteName: 'Home'
});

const DefaultStack = createStackNavigator({
  Tab: {
    screen: Tab,
    navigationOptions: () => ({
      header: null
    })
  },
  ItemDetail: {
    screen: ItemDetailScreen,
    navigationOptions: () => ({
      title: `商品信息`
    })
  },
  CartModel: {
    screen: CartScreen,
    navigationOptions: () => {
      return {
        title: '购物车'
      };
    }
  },
  OrderScreen: {screen: ModalScreen}
},
{
  navigationOptions: {
    // 开启动画
    animationEnabled: true,
    // 开启边缘触摸返回
    gesturesEnabled: true
  },
  mode: 'card'
});

export default DefaultStack;
