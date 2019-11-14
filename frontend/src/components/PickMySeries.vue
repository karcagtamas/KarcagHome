<template>
  <div>
    <v-btn color="primary" @click="dialog = true">
      <v-icon>mdi-auto-fix</v-icon>
    </v-btn>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>Sorozat hozzáadása a listámhoz</v-card-title>
        <v-card-text>
          <v-simple-table dense fixed-header height="50vh">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Név</th>
                  <th class="text-left">Jelölve</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="serie in series" :key="serie.id">
                  <td>{{serie.name}}</td>
                  <td>
                    <v-switch
                      dense="true"
                      @change="pickingSeries(serie)"
                      v-model="serie.picked"
                      color="deep-purple darken-4"
                    ></v-switch>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="warning" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import Series from '../models/series';

@Component({})
export default class PickMySeries extends Vue {
  @Action('fetchSeries') public fetchSeries: any;
  @Action('fetchMySeries') public fetchMySeries: any;
  @Action('pickSeries') public pickSeries: any;
  @Action('unPickSeries') public unPickSeries: any;
  @Getter('series') public series: Series[];
  @Getter('mySeries') public mySeries: Series[];
  public dialog: boolean = false;

  public mounted() {
    const userId = parseInt(localStorage.getItem('userId') || '0', undefined);
    this.fetchMySeries(userId);
    this.fetchSeries();
  }

  public async pickingSeries(series: Series) {
    const userId = parseInt(localStorage.getItem('userId') || '0', undefined);
    if (series.picked) {
      await this.pickSeries(series);
    } else {
      await this.unPickSeries(series);
    }
    this.fetchMySeries(userId);
  }
}
</script>

<style scoped>
</style>