import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import axios from 'axios';
import User from '../models/user';
import { RootState } from './types';

interface UserState {
  user: User;
  isLoggedIn: boolean;
}

const url = 'http://localhost:8000/api';

const state: UserState = {
  user: new User('', '', '', '', new Date()),
  isLoggedIn: false
};

const getters: GetterTree<UserState, RootState> = {
  user: cState => cState.user,
  isLoggedIn: cState => cState.isLoggedIn
};

const actions: ActionTree<UserState, RootState> = {
  async fetchUser({ commit }, id: number) {
    const response = await axios.get(`${url}/users/${id}`);

    commit('setUser', response.data[0]);
  },
  clearUser({ commit }) {
    commit('setUser', new User('', '', '', '', new Date()));
  },
  setIsLoggedIn({ commit }, newVal: boolean) {
    commit('setLoggedInStatus', newVal);
  }
};

const mutations: MutationTree<UserState> = {
  setUser: (cState: UserState, user: User) => (cState.user = user),
  setLoggedInStatus: (cState: UserState, newVal: boolean) =>
    (cState.isLoggedIn = newVal)
};

const UserModule: Module<UserState, RootState> = {
  state,
  getters,
  actions,
  mutations
};

export default UserModule;
