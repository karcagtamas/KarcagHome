<template>
  <div>
    <v-card raised>
      <v-card-title>Sorozatok</v-card-title>
      <v-simple-table dense fixed-header height="50vh" v-if="series">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Név</th>
              <th class="text-left">Létrehozó</th>
              <th class="text-left">Létrehozás</th>
              <th class="text-left">Utolsó szerkesztő</th>
              <th class="text-left">Utolsó szerkesztés</th>
              <th class="text-left">Művletek</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="serie in series" :key="serie.id" @click="showSeasonDialog(serie)">
              <td>{{serie.name}}</td>
              <td>{{serie.creater}}</td>
              <td>{{toDateString(serie.addedTime)}}</td>
              <td>{{serie.lastModifier}}</td>
              <td>{{toDateString(serie.lastModification)}}</td>
              <td>
                <!--   <v-btn class="m-1" color="error" fab x-small @click="remove(movie)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn class="m-1" color="warning" fab x-small @click="modify(movie)">
                  <v-icon>mdi-border-color</v-icon>
                </v-btn>-->
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <SeasonsDialog :series="selectedSeries" :show="show" @closeDialog="closeSeasonDialog"></SeasonsDialog>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import Series from '../models/series';
import SeasonsDialog from '../components/SeasonsDialog.vue';

@Component({ components: { SeasonsDialog } })
export default class SeriesView extends Vue {
  @Getter('series') public series: Series[];
  @Action('fetchSeries') public fetchSeries: any;
  public selectedSeries: Series = new Series(
    '',
    new Date(),
    '',
    0,
    new Date(),
    '',
    0,
    []
  );
  public show: boolean = false;

  public mounted() {
    this.fetchSeries();
  }

  // Convert date to string with format yyyy-mm-dd
  public toDateString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  public showSeasonDialog(series: Series) {
    this.selectedSeries = series;
    this.show = true;
  }

  public closeSeasonDialog() {
    this.selectedSeries = new Series(
      '',
      new Date(),
      '',
      0,
      new Date(),
      '',
      0,
      []
    );
    this.show = false;
  }
}
</script>