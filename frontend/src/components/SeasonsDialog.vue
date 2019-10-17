<template>
  <v-dialog v-model="show">
    <v-card>
      <v-card-title>Évadok</v-card-title>
      <v-card-text>
        <v-simple-table dense fixed-header height="60vh" v-if="series">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Évad</th>
                <th class="text-left">Epizódok</th>
                <th class="text-left">Műveletek</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(season, index) in series.seasons"
                :key="season.id"
                @click="openEpisodeDialog(season)"
              >
                <td>{{season.number}}</td>
                <td>{{season.episodeCount}}</td>
                <td>
                  <v-btn
                    class="m-1"
                    color="error"
                    fab
                    x-small
                    @click="remove(season)"
                    :disabled="index !== series.seasons.length - 1"
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
        <v-btn color="warning" @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
    <EpisodesDialog
      :show="showEpisodeDialogV"
      :season="episodeDialogData"
      @closeDialog="closeEpisodeDialog"
    ></EpisodesDialog>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import Series from '../models/series';
import Season from '../models/season';
import EpisodesDialog from './EpisodesDialog.vue';
import { Action } from 'vuex-class';

@Component({ components: { EpisodesDialog } })
export default class SeasonsDialog extends Vue {
  @Action('addSeason') public addSeason: any;
  @Action('deleteSeason') public deleteSeason: any;
  @Prop({ default: new Series('', new Date(), '', 0, new Date(), '', 0, []) })
  public series: Series;
  @Prop({ default: false })
  public show: boolean;
  public showEpisodeDialogV: boolean = false;
  public episodeDialogData: Season = new Season('', 0, 0, 0, []);

  @Emit('closeDialog') public close() {
    return;
  }

  public openEpisodeDialog(season: Season) {
    this.episodeDialogData = season;
    this.showEpisodeDialogV = true;
  }

  public closeEpisodeDialog() {
    this.episodeDialogData = new Season('', 0, 0, 0, []);
    this.showEpisodeDialogV = false;
  }

  public remove(season: Season) {
    this.deleteSeason(season);
  }
}
</script>