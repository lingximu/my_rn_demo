import {observable, computed, reaction, trace, autorun} from 'mobx';

export default class CartStore {
    @observable fruits = [{id: 1, count: 5}]; // id / 数量

    subscribeLogger () {
      autorun(() => {
        console.log('fruits.length: ', this.fruits.length);
        console.log('fruits: ', this.fruits);
      });
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
