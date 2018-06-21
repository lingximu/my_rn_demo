
import { observable, computed, action } from 'mobx';
import GoodsStore from './GoodsStore';

export default {
  goodsStore: new GoodsStore()
};
