<template>
  <div>
    <v-btn color="primary" @click="dialog = true">
      <v-icon>mdi-auto-fix</v-icon>
    </v-btn>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>Film hozzáadása a listámhoz</v-card-title>
        <v-card-text>
          <v-simple-table dense fixed-header height="50vh">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Név</th>
                  <th class="text-left">Jelölve</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="movie in movies" :key="movie.id">
                  <td>{{movie.name}}</td>
                  <td>
                    <v-switch
                      dense="true"
                      @change="pickingMovie(movie)"
                      v-model="movie.picked"
                      color="deep-purple darken-4"
                    ></v-switch>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="warning" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter, State } from 'vuex-class';
import Movie from '../models/movies';

@Component({})
export default class PickMyMovies extends Vue {
  @Action('fetchMovies') public fetchMovies: any;
  @Action('fetchMyMovies') public fetchMyMovies: any;
  @Action('pickMovie') public pickMovie: any;
  @Action('unPickMovie') public unPickMovie: any;
  @Getter('movies') public movies: Movie[];
  @Getter('myMovies') public myMovies: Movie[];
  public dialog: boolean = false;

  public mounted() {
    const userId = parseInt(localStorage.getItem('userId') || '0', undefined);
    this.fetchMyMovies(userId);
    this.fetchMovies();
  }

  public async pickingMovie(movie: Movie) {
    const userId = parseInt(localStorage.getItem('userId') || '0', undefined);
    if (movie.picked) {
      await this.pickMovie(movie);
    } else {
      await this.unPickMovie(movie);
    }
    this.fetchMyMovies(userId);
  }
}
</script>
<style scoped>
</style>