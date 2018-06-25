import {observable, computed, reaction} from 'mobx';

export default class CartStore {
    @observable fruits = [];

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
