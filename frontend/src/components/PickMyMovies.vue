<template>
  <div>
    <v-dialog v-model="dialog">
      <template v-slot:activator="{on}">
        <v-btn color="deep-purple darken-4" v-on="on">Add</v-btn>
      </template>
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

@Component({})
export default class PickMyMovies extends Vue {
  public dialog: boolean = false;
}
</script>