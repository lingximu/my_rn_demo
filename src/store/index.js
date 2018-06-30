
import CartStore from './CartStore';

const cartStore = new CartStore();
cartStore.subscribeLogger();
window.cartStore = cartStore;

export default {
  cartStore
};
