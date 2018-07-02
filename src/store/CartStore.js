import {observable, computed, reaction, trace, autorun, action } from 'mobx';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import config from '../config';
const assert = require('assert');

const client = new ApolloClient({
  uri: config.graphqlEndpoint
});
let manifestFruits = [];

client
  .query({
    query: gql`
    {
      fruits{
        id
        price
        name
      }
    }
    `
  })
  .then(result => {
    console.log('manifestFruits result', result.data.fruits);
    manifestFruits = result.data.fruits;
  })
  .catch(e => {
    console.error('!!!error: ', e);
  });

export default class CartStore {
    @observable fruits = [{id: 1, count: 5, selected: false}]; // id / 数量

    subscribeLogger () {
      autorun(() => {
        console.log('fruits.length: ', this.fruits.length);
        console.log('fruits: ', this.fruits);
      });
    }

    @action
    toggleAllSelect () {
      if (this.allSelected) {
        this.fruits.forEach(f => {
          f.selected = false;
        });
      } else {
        this.fruits.forEach(f => {
          f.selected = true;
        });
      }
    }

    @computed get totalMoney () {
      let total = 0;
      this.fruits.forEach(({id, count}) => {
        const {price} = manifestFruits.find(mf => mf.id === id);
        total += price * count;
      });
      return total;
    }

    @computed get allSelected () {
      return this.fruits.every(f => f.selected);
    }

    @action
    toggleSelect (id) {
      assert(typeof id === 'number');
      const current = this.fruits.find(f => f.id === id);
      current.selected = !current.selected;
    }

    @action
    delete (id) {
      const index = this.fruits.findIndex(f => f.id === id);
      if (index === -1) {
        console.error('购物车没有对应水果，但触发了 delete index:', index, 'id', id);
      } else {
        this.fruits.splice(index, 1);
      }
    }

    @action
    decrease (id) {
      const exist = this.fruits.find(f => f.id === id);
      if (!exist) {
        console.error('购物车没有对应水果，但触发了 decrease exist:', exist, 'id', id);
      } else {
        exist.count = exist.count - 1;
        if (exist.count <= 0) { this.delete(id); }
      }
    }

    @action
    addFruit ({id, count = 1, selected}) {
      assert(typeof id === 'number');
      assert(typeof count === 'number');
      if (count === 0) {
        console.error('增加为0，跳过');
        return;
      }

      const exist = this.fruits.find(f => f.id === id);
      if (exist) {
        exist.count = exist.count + 1;
      } else {
        this.fruits.push({
          id, count, selected: selected || false
        });
      }
    }

    subscribeServerToStore () {
      reaction(
        () => this.toJS(),
        todos => window.fetch && fetch('/api/todos', {
          method: 'post',
          body: JSON.stringify({ todos }),
          headers: new Headers({ 'Content-Type': 'application/json' })
        })
      );
    }
}
