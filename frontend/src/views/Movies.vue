<template>
  <div>
    <v-card raised>
      <v-card-title>Filmek</v-card-title>
      <v-simple-table dense fixed-header height="25vh">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Név</th>
              <th class="text-left">Létrehozás</th>
              <th class="text-left">Létrehozó</th>
              <th class="text-left">Utolsó szerkesztés</th>
              <th class="text-left">Utolsó szerkesztő</th>
              <th class="text-left">Művletek</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movie in movies" :key="movie.id">
              <td>{{movie.name}}</td>
              <td>{{toDateString(movie.addedTime)}}</td>
              <td>{{movie.creater}}</td>
              <td>{{toDateString(movie.lastModification)}}</td>
              <td>{{movie.lastModifier}}</td>
              <td>
                <v-btn class="m-1" color="error" fab x-small @click="remove(movie)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn class="m-1" color="warning" fab x-small @click="modify(movie)">
                  <v-icon>mdi-border-color</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <div class="my-3">
      <v-btn
        raised
        color="primary"
        v-if="!onCreation"
        @click="onCreation = true; onModify = false"
      >Új Film</v-btn>
    </div>
    <v-card raised v-if="onCreation || onModify" class="p-3 add-new-movie-panel">
      <v-card-title>Új film</v-card-title>
      <v-alert type="error" dismissible border="left" v-model="showERror">
        <strong>HIBA!</strong>
        {{error}}
      </v-alert>
      <v-form>
        <v-text-field
          v-model="newMovie.name"
          :counter="100"
          label="Név"
          required
          outlined
          dense
          clearable
        ></v-text-field>
        <div>
          <v-btn class="mr-2" raised color="warning" @click="back">Vissza</v-btn>
          <v-btn class="ml-2" raised color="success" @click="save">Mentés</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action, State } from 'vuex-class';
import Movie from '../models/movies';
import User from '../models/user';

@Component({})
export default class Movies extends Vue {
  @Action('fetchMovies') public fetchMovies: any;
  @Action('addMovie') public addMovie: any;
  @Action('updateMovie') public updateMovie: any;
  @Action('deleteMovie') public deleteMovie: any;
  @Getter('user') public user: User;
  @Getter('movies') public movies: Movie[];
  public error: string = '';
  public showError: boolean = false;
  public newMovie: Movie = new Movie(
    '',
    new Date(),
    '',
    0,
    new Date(),
    '',
    0,
    false
  );
  public onCreation: boolean = false;
  public onModify: boolean = false;

  public mounted() {
    this.fetchMovies();
  }

  public back(): void {
    this.newMovie = new Movie('', new Date(), '', 0, new Date(), '', 0, false);
    this.onModify = false;
    this.onCreation = false;
  }

  public save(): void {
    const movie: Movie = this.newMovie;
    if (!movie.name) {
      this.error = 'A név megadása kötelező';
      this.showError = true;
    }
    movie.lastModification = new Date();
    movie.lastModifier = this.user.name;
    movie.lastModifierId = this.user.id || 0;
    if (this.onCreation) {
      movie.creater = this.user.name;
      movie.createrId = this.user.id || 0;
      movie.addedTime = new Date();
      this.addMovie(movie);
      this.onCreation = false;
    } else {
      this.updateMovie(movie);
      this.onModify = false;
    }
    this.showError = false;
    this.newMovie = new Movie('', new Date(), '', 0, new Date(), '', 0, false);
  }

  public remove(movie: Movie): void {
    this.deleteMovie(movie);
  }

  public modify(movie: Movie): void {
    this.onModify = true;
    this.newMovie = { ...movie };
  }

  public toDateString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }
}
</script>

<style scoped>
</style>