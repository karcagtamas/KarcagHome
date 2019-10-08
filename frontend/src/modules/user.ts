import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import axios from 'axios';
import User from '../models/user';
import { RootState } from './types';

// User state
interface UserState {
  user: User;
  isLoggedIn: boolean;
}

// Backend url
const url = 'http://localhost:8000/api';

// Init user state
const state: UserState = {
  user: new User('', '', '', '', new Date()),
  isLoggedIn: false
};

// Getters
const getters: GetterTree<UserState, RootState> = {
  // Get user
  user: cState => cState.user,
  // Get is logged in status
  isLoggedIn: cState => cState.isLoggedIn
};

// Actions
const actions: ActionTree<UserState, RootState> = {
  // Fetch current user by the given id
  async fetchUser({ commit }, id: number) {
    const response = await axios.get(`${url}/users/${id}`);

    commit('setUser', response.data[0]);
  },
  // Clear state
  clearUser({ commit }) {
    commit('setUser', new User('', '', '', '', new Date()));
  },
  // Set is logged in status
  setIsLoggedIn({ commit }, newVal: boolean) {
    commit('setLoggedInStatus', newVal);
  }
};

// Mutations
const mutations: MutationTree<UserState> = {
  // Set user in to the state
  setUser: (cState: UserState, user: User) => (cState.user = user),
  // Set logged in status in to the state
  setLoggedInStatus: (cState: UserState, newVal: boolean) =>
    (cState.isLoggedIn = newVal)
};

// User module
const UserModule: Module<UserState, RootState> = {
  state,
  getters,
  actions,
  mutations
};

export default UserModule;
