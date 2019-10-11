import { RootState } from './modules/types';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import macs from './modules/macs';
import movies from './modules/movies';
import user from './modules/user';
import series from './modules/series';

// Vuex store
Vue.use(Vuex);

// Vuex modules
const store: StoreOptions<RootState> = {
  modules: {
    macs,
    movies,
    user,
    series
  }
};

export default new Vuex.Store(store);
