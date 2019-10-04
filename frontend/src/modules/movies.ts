import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import axios from 'axios';
import Movie from '../models/movies';
import { RootState } from './types';

interface MovieState {
  movies: Movie[];
  myMovies: Movie[];
}

const url = 'http://localhost:8000/api';

const state: MovieState = {
  movies: [],
  myMovies: []
};

const getters: GetterTree<MovieState, RootState> = {
  movies: cState => cState.movies,
  myMovies: cState => cState.myMovies
};

const actions: ActionTree<MovieState, RootState> = {
  async fetchMovies({ commit }) {
    const response = await axios.get(`${url}/movies`);

    commit('setMovies', response.data);
  },
  async fetchMyMovies({ commit }, userId: number) {
    const response = await axios.get(`${url}/movies/${userId}`);

    commit('setMyMovies', response.data);
  }
};

const mutations: MutationTree<MovieState> = {
  setMovies: (cState: MovieState, movies: Movie[]) => (cState.movies = movies),
  setMyMovies: (cState: MovieState, movies: Movie[]) =>
    (cState.myMovies = movies)
};

const Movies: Module<MovieState, RootState> = {
  state,
  getters,
  actions,
  mutations
};

export default Movies;
