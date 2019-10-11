<template>
  <div>
    <!-- Movies page -->
    <v-card raised>
      <!-- Title -->
      <v-card-title>Filmek</v-card-title>
      <!-- List of movies -->
      <v-simple-table dense fixed-header height="25vh">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Név</th>
              <th class="text-left">Létrehozás</th>
              <th class="text-left">Létrehozó</th>
              <th class="text-left">Utolsó szerkesztés</th>
              <th class="text-left">Utolsó szerkesztő</th>
              <th class="text-left">Műveletek</th>
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
    <!-- Add new movies button -->
    <div class="my-3">
      <v-btn
        raised
        color="primary"
        v-if="!onCreation"
        @click="onCreation = true; onModify = false"
      >Új Film</v-btn>
    </div>
    <!-- Adding or modifing form for movies -->
    <v-card raised v-if="onCreation || onModify" class="p-3 add-new-movie-panel">
      <v-card-title>Új film</v-card-title>
      <!-- Error alert -->
      <v-alert type="error" dismissible border="left" v-model="showError">
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
  // Fetch movies action
  @Action('fetchMovies') public fetchMovies: any;
  // Fetch user action
  @Action('fetchUser') public fetchUser: any;
  // Add new movie action
  @Action('addMovie') public addMovie: any;
  // Update movie action
  @Action('updateMovie') public updateMovie: any;
  // Delete movie action
  @Action('deleteMovie') public deleteMovie: any;
  // Get user
  @Getter('user') public user: User;
  // Get movies
  @Getter('movies') public movies: Movie[];
  // Error text
  public error: string = '';
  // Show error logic value
  public showError: boolean = false;
  // New movie for the form
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
  // Current event is creation
  public onCreation: boolean = false;
  // Current event is modifing
  public onModify: boolean = false;

  // Mounted
  public mounted() {
    const userId = parseInt(localStorage.getItem('userId') || '0', undefined);
    this.fetchUser(userId);
    this.fetchMovies();
  }

  // Back button event from the form
  public back(): void {
    this.newMovie = new Movie('', new Date(), '', 0, new Date(), '', 0, false);
    this.onModify = false;
    this.onCreation = false;
  }

  // Save values
  public save(): void {
    const movie: Movie = this.newMovie;
    // Check name is valid
    if (!movie.name) {
      this.error = 'A név megadása kötelező';
      this.showError = true;
    }
    // Set last modification parameters
    movie.lastModification = new Date();
    movie.lastModifier = this.user.name;
    movie.lastModifierId = this.user.id || 0;
    // Current event is creation
    if (this.onCreation) {
      // Add creater values
      movie.creater = this.user.name;
      movie.createrId = this.user.id || 0;
      movie.addedTime = new Date();
      // Add new movie
      this.addMovie(movie);
      this.onCreation = false;
    } else {
      // Update movie
      this.updateMovie(movie);
      this.onModify = false;
    }
    // Hide error
    this.showError = false;
    this.newMovie = new Movie('', new Date(), '', 0, new Date(), '', 0, false);
  }

  // Remove movie
  public remove(movie: Movie): void {
    this.deleteMovie(movie);
  }

  // Modify movie
  public modify(movie: Movie): void {
    this.onModify = true;
    this.newMovie = { ...movie };
  }

  // Convert date to string with format yyyy-mm-dd
  public toDateString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }
}
</script>

<style scoped>
</style>