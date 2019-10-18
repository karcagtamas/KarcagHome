<template>
  <v-dialog v-model="show" persistent>
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
              <tr v-for="(episode, index) in season.episodes" :key="episode.id">
                <td>{{episode.number}}</td>
                <td>
                  <v-btn
                    class="m-1"
                    color="error"
                    fab
                    x-small
                    @click="remove(episode)"
                    :disabled="index !== season.episodes.length - 1"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <div class="m-1">
          <v-btn color="warning" @click="close">Close</v-btn>
        </div>
        <div class="m-1">
          <v-btn raised color="primary" @click="add">Új epizód</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import Season from '../models/season';
import Episode from '../models/episode';

@Component({})
export default class EpisodesDialog extends Vue {
  @Action('addEpisode') public addEpisode: any;
  @Action('deleteEpisode') public deleteEpisode: any;
  @Prop({ default: new Season('', 0, 0, 0, []) }) public season: Season;
  @Prop({ default: false }) public show: boolean;

  @Emit('closeDialog') public close() {
    return;
  }

  public remove(episode: Episode) {
    this.deleteEpisode(episode);
  }

  public add() {
    const ep: Episode = new Episode(
      this.season.id || 0,
      this.season.number,
      this.season.episodes.length + 1,
      false
    );
    this.addEpisode(ep);
  }
}
</script>