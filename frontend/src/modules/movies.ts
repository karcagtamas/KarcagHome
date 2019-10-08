import Movie from '@/models/movies';
import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import axios from 'axios';
import { RootState } from './types';

// Movie state
interface MovieState {
  movies: Movie[];
  myMovies: Movie[];
}

// Backend url
const url = 'http://localhost:8000/api';

// Init state
const state: MovieState = {
  movies: [],
  myMovies: []
};

// Getters
const getters: GetterTree<MovieState, RootState> = {
  // Get movies
  movies: cState => cState.movies,
  // Get my movies
  myMovies: cState => cState.myMovies
};

// Actions
const actions: ActionTree<MovieState, RootState> = {
  // Fetch movies
  async fetchMovies({ commit }) {
    const response = await axios.get(`${url}/movies`);

    commit('setMovies', response.data);
  },
  // Fetch my movies
  async fetchMyMovies({ commit }, userId: number) {
    const response = await axios.get(`${url}/movies/${userId}`);

    commit('setMyMovies', response.data);
  },
  // Add new movie
  async addMovie({ commit }, movie: Movie) {
    const response = await axios.post(`${url}/movies`, { movie });

    commit('addMovie', response.data);
  },
  // Update existing movie
  async updateMovie({ commit }, movie: Movie) {
    const response = await axios.put(`${url}/movies`, { movie });

    commit('updateMovie', movie);
  },
  // Delete movie
  async deleteMovie({ commit }, movie: Movie) {
    const response = await axios.delete(`${url}/movies/${movie.id}`);

    commit('deleteMovie', movie.id);
  },
  // Set seen status for a movie
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

// Mutations
const mutations: MutationTree<MovieState> = {
  // Set movies to the state
  setMovies: (cState: MovieState, movies: Movie[]) =>
    (cState.movies = movies.map(x => {
      x.addedTime = new Date(x.addedTime);
      x.lastModification = new Date(x.lastModification);
      return x;
    })),
  // Set my movies to the state
  setMyMovies: (cState: MovieState, movies: Movie[]) =>
    (cState.myMovies = movies.map(x => {
      x.addedTime = new Date(x.addedTime);
      x.lastModification = new Date(x.lastModification);

      return x;
    })),
  // Add new movie in to the state
  addMovie: (cState: MovieState, movie: Movie) => cState.movies.push(movie),
  // Update existing movie in the state
  updateMovie: (cState: MovieState, movie: Movie) => {
    const index = cState.movies.findIndex(x => x.id === movie.id);
    if (index !== -1) {
      cState.movies.splice(index, 1, movie);
    }
  },
  // Delete movie from the state
  deleteMovie: (cState: MovieState, movieId: number) =>
    (cState.movies = cState.movies.filter(x => x.id !== movieId)),
  // Update my movie
  updateMyMovie: (cState: MovieState, movie: Movie) => {
    const index = cState.myMovies.findIndex(x => x.id === movie.id);
    if (index !== -1) {
      cState.myMovies.splice(index, 1, movie);
    }
  }
};

// Movies module
const Movies: Module<MovieState, RootState> = {
  state,
  getters,
  actions,
  mutations
};

export default Movies;
