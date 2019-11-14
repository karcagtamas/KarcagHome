<template>
  <div>
    <!-- My movies page -->
    <v-card raised>
      <!-- Title -->
      <v-card-title>Sorozataim</v-card-title>
      <!-- List of my movies -->
      <v-simple-table dense fixed-header height="60vh">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Sorozat</th>
              <th class="text-left">
                <v-icon>mdi-eye</v-icon>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="serie in series" :key="serie.id">
              <td>{{movie.name}}</td>
              <td>
                <!--                 <v-switch
                  @change="changeSeen(movie)"
                  v-model="movie.seen"
                  color="deep-purple darken-4"
                  dense
                ></v-switch>-->
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="stat">
        <h5>
          <strong>Statisztika</strong>
        </h5>
        <p>
          Látott sorozatok:
          <strong>{{countOfSeriesSeen}}</strong>
        </p>
        <p>
          Nem látott sorozatok:
          <strong>{{countOfSeriesUnSeen}}</strong>
        </p>
        <p>
          Látott évadok:
          <strong>{{countOfSeasonsSeen}}</strong>
        </p>
        <p>
          Nem látott évadok:
          <strong>{{countOfSeasonsUnSeen}}</strong>
        </p>
        <p>
          Látott epizódok:
          <strong>{{countOfEpisodesSeen}}</strong>
        </p>
        <p>
          Nem látott epizódok:
          <strong>{{countOfEpisodesUnSeen}}</strong>
        </p>
      </div>
    </v-card>
    <div class="my-3">
      <PickMySeries></PickMySeries>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import Series from '../models/series';
import PickMySeries from '../components/PickMySeries.vue';

@Component({ components: { PickMySeries } })
export default class MySeries extends Vue {
  @Action('fetchMySeries') public fetchMySeries: any;
  @Action('seenSeries') public seenSeries: any;
  @Getter('mySeries') public series: Series[];
  public countOfSeriesSeen: number = 0;
  public countOfSeriesUnSeen: number = 0;
  public countOfSeasonsSeen: number = 0;
  public countOfSeasonsUnSeen: number = 0;
  public countOfEpisodesSeen: number = 0;
  public countOfEpisodesUnSeen: number = 0;

  @Watch('series') public onSeriesChanges() {}

  public mounted() {
    const userId = parseInt(localStorage.getItem('userId') || '0', undefined);
    this.fetchMySeries(userId);
  }

  // Convert date to string with format 'yyyy-mm-dd'
  public toDateString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  public changeSeen() {}
}
</script>
<style scoped>
.seen {
  background-color: rgba(6, 168, 6, 0.295);
  transition-duration: 0.5s;
}
.seen:hover {
  background-color: rgba(3, 112, 3, 0.562) !important;
  transition-duration: 0.5s;
}
.unseen {
  background-color: rgba(153, 0, 0, 0.301);
  transition-duration: 0.5s;
}
.unseen:hover {
  background-color: rgba(182, 0, 0, 0.521) !important;
  transition-duration: 0.5s;
}
.stat {
  padding: 1rem;
}
</style>