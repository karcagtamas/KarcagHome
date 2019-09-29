<template>
  <div>
    <div v-for="movie in movies" :key="movie.id">{{movie.name}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action, State } from 'vuex-class';
import Movie from '../models/movies';

@Component({})
export default class Movies extends Vue {
  @Action('fetchMovies') public fetchMovies: any;
  @Getter('movies') public movies: Movie[];

  public mounted() {
    this.fetchMovies();
  }
}
</script>

<style scoped>
</style>