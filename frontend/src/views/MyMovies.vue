<template>
  <div>
    <!-- My movies page -->
    <v-card raised>
      <!-- Title -->
      <v-card-title>Filmjeim</v-card-title>
      <!-- List of my movies -->
      <v-simple-table dense fixed-header height="25vh">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Név</th>
              <th class="text-left">Láttam</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movie in movies" :key="movie.id">
              <td>{{movie.name}}</td>
              <td>
                <v-switch
                  @change="changeSeen(movie)"
                  v-model="movie.seen"
                  color="deep-purple darken-4"
                ></v-switch>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <div class="my-3">
      <v-btn raised color="primary">
        <v-icon>mdi-auto-fix</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Movie from '../models/movies';
import { Getter, Action, State } from 'vuex-class';

@Component({})
export default class MyMovies extends Vue {
  // Fetch my movies event
  @Action('fetchMyMovies') public fetchMyMovies: any;
  // Set seen the movies action
  @Action('seenMovie') public seenMovie: any;
  // Get may movies
  @Getter('myMovies') public movies: Movie[];

  // Mounted
  public mounted() {
    const userId = parseInt(localStorage.getItem('userId') || '0', undefined);
    this.fetchMyMovies(userId);
  }

  // Convert date to string with format 'yyyy-mm-dd'
  public toDateString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  // Change seen event for movies
  public changeSeen(movie: Movie): void {
    this.seenMovie(movie);
  }
}
</script>
<style scoped>
</style>