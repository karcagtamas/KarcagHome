<template>
  <v-dialog v-model="show">
    <v-card>
      <v-card-title>Epizódok</v-card-title>
      <v-card-text>
        <v-simple-table dense fixed-header height="60vh" v-if="season">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Epizód</th>
                <th class="text-left">Műveletek</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="episode in season.episodes" :key="episode.id">
                <td>{{episode.number}}</td>
                <td></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="warning" @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import Season from '../models/season';

@Component({})
export default class EpisodesDialog extends Vue {
  @Prop({ default: new Season('', 0, 0, 0, []) }) public season: Season;
  @Prop(Boolean) public show: boolean = false;

  @Emit('closeDialog') public close() {
    return;
  }
}
</script>