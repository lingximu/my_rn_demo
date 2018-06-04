/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ApolloClient from 'apollo-boost'
import gql from "graphql-tag";
import { ApolloProvider,Query } from "react-apollo";

import config from "./config";

const client = new ApolloClient({
  uri: config.graphqlEndpoint
})

client
  .query({
    query: gql`
    {
      posts{
        title
      }
    }
    `
  })
  .then(result => {
    console.log('!!!',result)
  })
  .catch(e=>{
    console.error('!!!error: ',e)
  })

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const PostTitles = () => (
  <Query
    query={gql`
      {
      posts{
        title
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      console.log('PostTitles组件：',loading,error,data)
      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>Error :(</Text>;

      return data.posts.map(({ title,id }) => (
        <View key={title}>
          <Text>
          {title}
          </Text>
        </View>
      ));
    }}
  </Query>
);

export default class App extends Component<{}> {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text>post内容</Text>
          <PostTitles></PostTitles>
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
