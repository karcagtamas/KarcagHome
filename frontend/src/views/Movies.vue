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
              <th class="text-left">Megjelölés</th>
              <th class="text-left">Művletek</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movie in movies" :key="movie.id">
              <td>{{movie.name}}</td>
              <td>{{movie.addedTime}}</td>
              <td>{{movie.creater}}</td>
              <td>{{movie.lastModification}}</td>
              <td>{{movie.lastModifier}}</td>
              <td>{{''}}</td>
              <td>
                <v-btn
                  disabled
                  class="m-1"
                  color="error"
                  fab
                  x-small
                  @click="deleteMacAddress(mac.id)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn disabled class="m-1" color="warning" fab x-small @click="modifyMac(mac)">
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
  public error: string = '';
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
}
</script>

<style scoped>
</style>