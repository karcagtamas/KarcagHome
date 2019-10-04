import { RootState } from './modules/types';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import macs from './modules/macs';
import movies from './modules/movies';
import user from './modules/user';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    macs,
    movies,
    user
  }
};

export default new Vuex.Store(store);
