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
            <tr v-for="serie in series" :key="serie.id">
              <td>{{serie.name}}</td>
              <td>{{serie.creater}}</td>
              <td>{{toDateString(serie.addedTime)}}</td>
              <td>{{serie.lastModifier}}</td>
              <td>{{toDateString(serie.lastModification)}}</td>
              <td class="buttons">
                <v-btn class="m-1" color="error" fab x-small @click="remove(serie)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn class="m-1" color="warning" fab x-small @click="modify(serie)">
                  <v-icon>mdi-border-color</v-icon>
                </v-btn>
                <v-btn class="m-1" color="success" fab x-small @click="showSeasonDialog(serie)">
                  <v-icon>mdi-arrow-right-bold-circle</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <SeasonsDialog :series="selectedSeries" :show="show" @closeDialog="closeSeasonDialog"></SeasonsDialog>
    </v-card>
    <!-- Add new movies button -->
    <div class="my-3">
      <v-btn
        raised
        color="primary"
        v-if="!onCreation"
        @click="onCreation = true; onModify = false"
      >Új Sorozat</v-btn>
    </div>
    <!-- Adding or modifing form for movies -->
    <v-card raised v-if="onCreation || onModify" class="p-3 add-new-series-panel">
      <v-card-title>Új sorozat</v-card-title>
      <!-- Error alert -->
      <v-alert type="error" dismissible border="left" v-model="showError">
        <strong>HIBA!</strong>
        {{error}}
      </v-alert>
      <v-form>
        <v-text-field
          v-model="newSeries.name"
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
import { Getter, Action } from 'vuex-class';
import Series from '../models/series';
import User from '../models/user';
import SeasonsDialog from '../components/SeasonsDialog.vue';

@Component({ components: { SeasonsDialog } })
export default class SeriesView extends Vue {
  @Getter('series') public series: Series[];
  // Get user
  @Getter('user') public user: User;
  @Action('fetchSeries') public fetchSeries: any;
  @Action('addSeries') public addSeries: any;
  @Action('deleteSeries') public deleteSeries: any;
  @Action('updateSeries') public updateSeries: any;
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
  public newSeries: Series = new Series(
    '',
    new Date(),
    '',
    0,
    new Date(),
    '',
    0,
    []
  );
  public onModify: boolean = false;
  public onCreation: boolean = false;
  public error: string = '';
  public showError: boolean = false;

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

  // Back button event from the form
  public back(): void {
    this.newSeries = new Series('', new Date(), '', 0, new Date(), '', 0, []);
    this.onModify = false;
    this.onCreation = false;
  }

  // Save values
  public save(): void {
    const series: Series = this.newSeries;
    // Check name is valid
    if (!series.name) {
      this.error = 'A név megadása kötelező';
      this.showError = true;
    }
    // Set last modification parameters
    series.lastModification = new Date();
    series.lastModifier = this.user.name;
    series.lastModifierId = this.user.id || 0;
    // Current event is creation
    if (this.onCreation) {
      // Add creater values
      series.creater = this.user.name;
      series.createrId = this.user.id || 0;
      series.addedTime = new Date();
      // Add new movie
      this.addSeries(series);
      this.onCreation = false;
    } else {
      // Update movie
      this.updateSeries(series);
      this.onModify = false;
    }
    // Hide error
    this.showError = false;
    this.newSeries = new Series('', new Date(), '', 0, new Date(), '', 0, []);
  }

  // Remove movie
  public remove(series: Series): void {
    this.deleteSeries(series);
  }

  // Modify movie
  public modify(series: Series): void {
    this.onModify = true;
    this.newSeries = { ...series };
  }
}
</script>
<style scoped>
td.buttons v-btn {
  z-index: 1;
}
</style>