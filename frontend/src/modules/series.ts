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
  },
  async addSeries({ commit }, series: Series) {
    const response = await axios.post(`${url}/series`, {
      name: series.name,
      creater: series.createrId
    });

    commit('addSeries', response.data);
  },
  async updateSeries({ commit }, series: Series) {
    await axios.put(`${url}/series/${series.id}`, {
      name: series.name,
      updater: series.lastModifierId
    });

    commit('updateSeries', series);
  },
  async deleteSeries({ commit }, series: Series) {
    await axios.delete(`${url}/series/${series.id}`);

    commit('deleteSeries', series.id);
  },
  async addSeason({ commit }, season: Season) {
    if (season.seriesId) {
      const response = await axios.post(`${url}/series/seasons`, {
        series: season.seriesId || 0,
        number: season.number,
        episodes: season.episodeCount
      });
      commit('addSeason', response.data);
    }
  },
  async deleteSeason({ commit }, season: Season) {
    await axios.delete(`${url}/series/seasons/${season.id}`);

    commit('deleteSeason', season.id);
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
  },
  addSeries: (cState: SeriesState, series: Series) => {
    series.addedTime = new Date(series.addedTime);
    series.lastModification = new Date(series.lastModification);
    cState.series.push(series);
  },
  updateSeries: (cState: SeriesState, series: Series) => {
    const index = cState.series.findIndex(x => x.id === series.id);
    series.addedTime = new Date(series.addedTime);
    series.lastModification = new Date(series.lastModification);
    if (index !== -1) {
      cState.series.splice(index, 1, series);
    }
  },
  deleteSeries: (cState: SeriesState, id: number) => {
    cState.series = cState.series.filter(x => x.id !== id);
  },
  addSeason: (cState: SeriesState, season: Season) => {
    cState.series.map(x => {
      if (x.id === season.seriesId) {
        x.seasons.push(season);
      }
      return x;
    });
  },
  deleteSeason: (cState: SeriesState, season: Season) => {
    cState.series.map(x => {
      if (x.id === season.seriesId) {
        x.seasons = x.seasons.filter(y => y.id !== season.id);
        return x;
      }
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
