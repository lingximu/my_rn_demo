
import React from 'react';
import {
  Platform, StyleSheet, Text, View, Button
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import FruitItems from '../../compose/FruitItems';
const ScrollableTabView = require('react-native-scrollable-tab-view');
import Title from '../../component/Title';
import theme from '../../config/theme';

const GET_CATEGORIES = gql`
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
`;
export default class CategoryScreen extends React.Component {
  render () {
    return (
      <Query
        query={GET_CATEGORIES}
      >
        {({ loading, error, data, refetch, networkStatus, updateQuery }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :{error.message}</Text>;
          const items = data.categories.map(({ name, id, fruits }) => (
            <View key={id} tabLabel={name} style={{flex: 1}}>
              <Title text={'精品' + name} />
              <FruitItems onRefresh={refetch} refreshing={networkStatus === 4} items={fruits} navigation={this.props.navigation} />
            </View>
          ));
          return <ScrollableTabView style={styles.container}
            tabBarTextStyle={styles.tabBarText}
            tabBarUnderlineStyle={styles.tabBarUnderline}
            initialPage={0}
          >
            {items}
          </ScrollableTabView>;
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  tabBarTextStyle: {
    fontSize: 20,
    alignSelf: 'center'
  },
  tabBarUnderlineStyle: {
    backgroundColor: theme.color
  }
});
