<template>
  <div>
    <!-- My movies page -->
    <v-card raised>
      <!-- Title -->
      <v-card-title>Filmjeim</v-card-title>
      <!-- List of my movies -->
      <v-simple-table dense fixed-header height="60vh">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Film</th>
              <th class="text-left">
                <v-icon>mdi-eye</v-icon>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="movie in movies"
              :key="movie.id"
              :class="{seen : movie.seen, unseen: !movie.seen}"
            >
              <td>{{movie.name}}</td>
              <td>
                <v-switch
                  @change="changeSeen(movie)"
                  v-model="movie.seen"
                  color="deep-purple darken-4"
                  dense
                ></v-switch>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="stat">
        <h5>
          <strong>Statisztika</strong>
        </h5>
        <p>
          Látott filmek:
          <strong>{{countOfSeen}}</strong>
        </p>
        <p>
          Nem látott filmek:
          <strong>{{countOfUnSeen}}</strong>
        </p>
      </div>
    </v-card>
    <div class="my-3">
      <PickMyMovies></PickMyMovies>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import Movie from '../models/movies';
import { Getter, Action, State } from 'vuex-class';
import PickMyMovies from '../components/PickMyMovies.vue';

@Component({ components: { PickMyMovies } })
export default class MyMovies extends Vue {
  // Fetch my movies event
  @Action('fetchMyMovies') public fetchMyMovies: any;
  // Set seen the movies action
  @Action('seenMovie') public seenMovie: any;
  // Get my movies
  @Getter('myMovies') public movies: Movie[];
  // Seen movies
  public countOfSeen: number = 0;
  // Un seen movies
  public countOfUnSeen: number = 0;
  @Watch('movies') public onMoviesChanges() {
    this.calculateCounts();
  }

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

  // calculateCounts
  public calculateCounts() {
    let count = 0;
    for (const i of this.movies) {
      if (i.seen) {
        count++;
      }
    }
    this.countOfSeen = count;
    this.countOfUnSeen = this.movies.length - count;
  }
}
</script>
<style scoped>
.seen {
  background-color: rgba(6, 168, 6, 0.295);
  transition-duration: 0.5s;
}
.seen:hover {
  background-color: rgba(3, 112, 3, 0.562) !important;
  transition-duration: 0.5s;
}
.unseen {
  background-color: rgba(153, 0, 0, 0.301);
  transition-duration: 0.5s;
}
.unseen:hover {
  background-color: rgba(182, 0, 0, 0.521) !important;
  transition-duration: 0.5s;
}
.stat {
  padding: 1rem;
}
</style>