import axios from 'axios';
import MacAddress from '../models/macAddress';
import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import { RootState } from './types';

// Mac State
interface MacState {
  macs: MacAddress[];
}

// Backend url
const url = 'http://localhost:8000/api';

// Init state
const state: MacState = {
  macs: []
};

// Getters
const getters: GetterTree<MacState, RootState> = {
  // Get all mac
  allMacs: sstate => sstate.macs
};

// Actions
const actions: ActionTree<MacState, RootState> = {
  // Fetch macs
  async fetchMacs({ commit }) {
    const response = await axios.get(`${url}/macs`);

    commit('setMacs', response.data);
  },
  // Add new mac
  async addMac({ commit }, mac: MacAddress) {
    const response = await axios.post(`${url}/macs`, { address: mac });

    commit('newMac', response.data);
  },
  // Delete mac
  async deleteMac({ commit }, id: number) {
    await axios.delete(`${url}/macs/${id}`);

    commit('removeMac', id);
  } /*
  async filterTodos({ commit }, e) {
    // Get selected number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );

    commit('setTodos', response.data);
  },*/,
  // Update mac
  async updateMac({ commit }, updatedMac: MacAddress) {
    const response = await axios.put(`${url}/macs`, { address: updatedMac });
    commit('updateMac', response.data);
  }
};

// Mutaions
const mutations: MutationTree<MacState> = {
  // Set macs
  setMacs: (cState, macs: MacAddress[]) => (cState.macs = macs),
  // Add new mac into the state
  newMac: (cState, mac: MacAddress) => cState.macs.unshift(mac),
  // Remove mac from the state
  removeMac: (cState, id) =>
    (cState.macs = cState.macs.filter(x => x.id !== id)),
  // Update mac in the state
  updateMac: (cState, mac) => {
    const index = cState.macs.findIndex(x => x.id === mac.id);
    if (index !== -1) {
      cState.macs.splice(index, 1, mac);
    }
  }
};

// MacModule
const Macs: Module<MacState, RootState> = {
  state,
  getters,
  actions,
  mutations
};

export default Macs;
