import { RootState } from './modules/types';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import macs from './modules/macs';
import movies from './modules/movies';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    macs,
    movies
  }
};

export default new Vuex.Store(store);
