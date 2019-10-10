<template>
  <div>
    <v-btn color="primary" @click="dialog = true">Add</v-btn>
    <v-dialog v-model="dialog">
      <!-- <template v-slot:activator="{on}">
        <v-btn color="deep-purple darken-4" v-on="on">Add</v-btn>
      </template>-->
      <v-card>
        <v-card-title>Title</v-card-title>
        <v-card-text>asd</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" @click="dialog = false">Add</v-btn>
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
  @Getter('myMovies') public myMovies: Movie[];
  public dialog: boolean = false;

  public mounted() {
    this.fetchMovies();
    this.fetchMyMovies();
  }
}
</script>