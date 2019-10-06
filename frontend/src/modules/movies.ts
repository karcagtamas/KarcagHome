import Movie from '@/models/movies';
import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import axios from 'axios';
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
  },
  async addMovie({ commit }, movie: Movie) {
    const response = await axios.post(`${url}/movies`, { movie });

    commit('addMovie', response.data);
  },
  async updateMovie({ commit }, movie: Movie) {
    const response = await axios.put(`${url}/movies`, { movie });

    commit('updateMovie', movie);
  },
  async deleteMovie({ commit }, movie: Movie) {
    const response = await axios.delete(`${url}/movies/${movie.id}`);

    commit('deleteMovie', movie.id);
  },
  async seenMovie({ commit }, movie: Movie) {
    const userId: number = parseInt(
      localStorage.getItem('userId') || '0',
      undefined
    );
    const response = await axios.post(`${url}/movies/${movie.id}/seen`, {
      userId,
      seen: movie.seen
    });

    commit('updateMyMovie', movie);
  }
};

const mutations: MutationTree<MovieState> = {
  setMovies: (cState: MovieState, movies: Movie[]) =>
    (cState.movies = movies.map(x => {
      x.addedTime = new Date(x.addedTime);
      x.lastModification = new Date(x.lastModification);
      return x;
    })),
  setMyMovies: (cState: MovieState, movies: Movie[]) =>
    (cState.myMovies = movies.map(x => {
      x.addedTime = new Date(x.addedTime);
      x.lastModification = new Date(x.lastModification);

      return x;
    })),
  addMovie: (cState: MovieState, movie: Movie) => cState.movies.push(movie),
  updateMovie: (cState: MovieState, movie: Movie) => {
    const index = cState.movies.findIndex(x => x.id === movie.id);
    if (index !== -1) {
      cState.movies.splice(index, 1, movie);
    }
  },
  deleteMovie: (cState: MovieState, movieId: number) =>
    (cState.movies = cState.movies.filter(x => x.id !== movieId)),
  updateMyMovie: (cState: MovieState, movie: Movie) => {
    const index = cState.myMovies.findIndex(x => x.id === movie.id);
    if (index !== -1) {
      cState.myMovies.splice(index, 1, movie);
    }
  }
};

const Movies: Module<MovieState, RootState> = {
  state,
  getters,
  actions,
  mutations
};

export default Movies;
