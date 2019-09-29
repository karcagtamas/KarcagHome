import axios from 'axios';
import MacAddress from '../models/macAddress';
import { ActionTree, MutationTree, Getter, GetterTree } from 'vuex';

interface IState {
  macs: MacAddress[];
}

const url = 'http://localhost:8000/api';

const state: IState = {
  macs: []
};

const getters: GetterTree<IState, any> = {
  allMacs: sstate => sstate.macs
};

const actions: ActionTree<IState, IState> = {
  async fetchMacs({ commit }) {
    const response = await axios.get(`${url}/macs`);

    commit('setMacs', response.data);
  },
  async addMac({ commit }, mac: MacAddress) {
    const response = await axios.post(`${url}/macs`, { address: mac });

    commit('newMac', response.data);
  },
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
  async updateMac({ commit }, updatedMac: MacAddress) {
    const response = await axios.put(`${url}/macs`, { address: updatedMac });
    commit('updateMac', response.data);
  }
};

const mutations: MutationTree<IState> = {
  setMacs: (cState, macs: MacAddress[]) => (cState.macs = macs),
  newMac: (cState, mac: MacAddress) => cState.macs.unshift(mac),
  removeMac: (cState, id) =>
    (cState.macs = cState.macs.filter(x => x.id !== id)),
  updateMac: (cState, todo) => {
    const index = cState.macs.findIndex(x => x.id === todo.id);
    if (index !== -1) {
      cState.macs.splice(index, 1, todo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
