import Vue from 'vue';
import Vuex from 'vuex';
import macs from './modules/macs';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { macs }
});
