import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';
import Series from '@/models/series';
import { url } from '../utils/helper';
import axios from 'axios';
import { RootState } from './types';
import Season from '@/models/season';
import Episode from '@/models/episode';

// Series state
interface SeriesState {
  series: Series[];
  mySeries: Series[];
}

// Init state
const state: SeriesState = {
  series: [
    new Series('Avatar', new Date(), 'Karcag', 1, new Date(), 'Karcag', 1, [
      new Season('Avatar', 1, 1, 3, [new Episode(1, 1, 1, false)])
    ])
  ],
  mySeries: []
};

// Getters
const getters: GetterTree<SeriesState, RootState> = {
  // Get series
  series: (cState: SeriesState) => cState.series,
  // Get my series
  mySeries: (cState: SeriesState) => cState.mySeries
};

// Actions
const actions: ActionTree<SeriesState, RootState> = {
  async fetchSeries({ commit }) {
    const response = await axios.get(`${url}/series`);

    commit('setSeries', response.data);
  }
};

// Mutations
const mutations: MutationTree<SeriesState> = {
  setSeries: (cState: SeriesState, series: Series[]) => {
    cState.series = series.map(x => {
      x.addedTime = new Date(x.addedTime);
      x.lastModification = new Date(x.lastModification);
      return x;
    });
  }
};

const SeriesModule: Module<SeriesState, RootState> = {
  state,
  getters,
  actions,
  mutations
};

export default SeriesModule;
