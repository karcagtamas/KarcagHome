import axios from 'axios';
import MacAddress from '../models/macAddress';
import { ActionTree, MutationTree, Getter, GetterTree } from 'vuex';

interface IState {
  macs: MacAddress[];
}

const state: IState = {
  macs: []
};

const getters: GetterTree<IState, any> = {
  allMacs: sstate => sstate.macs
};

const actions: ActionTree<IState, IState> = {
  async fetchMacs({ commit }) {
    const response = await axios.get('http://localhost:8000/api/macs');

    commit('setMacs', response.data);
  } /*,
  async addTodo({ commit }, title) {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      { title, completed: false }
    );

    commit('newTodo', response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit('removeTsonplaceholder.typicode.com/todosodo', id);
  },
  async filterTodos({ commit }, e) {
    // Get selected number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );

    commit('setTodos', response.data);
  },
  async updateTodo({ commit }, updatedTodo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
      updatedTodo
    );
    commit('updateTodo', response.data);
  } */
};

const mutations: MutationTree<IState> = {
  setMacs: (cState, todos) =>
    (cState.macs = todos) /*,
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(x => x.id !== id)),
  updateTodo: (state, todo) => {
    const index = state.todos.findIndex(x => x.id === todo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, todo);
    }
  } */
};

export default {
  state,
  getters,
  actions,
  mutations
};
