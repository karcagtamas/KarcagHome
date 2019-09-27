<template>
  <div>
    <h1>MAC Címek</h1>
    <table>
      <thead>
        <tr>
          <th>Cím</th>
          <th>Tulaj</th>
          <th>Eszköz</th>
          <th>Eszköz név</th>
          <th>IP</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mac in allMacs" :key="mac.id">
          <td>{{mac.address}}</td>
          <td>{{mac.owner}}</td>
          <td>{{mac.name}}</td>
          <td>{{mac.deviceName}}</td>
          <td>{{mac.ip ? mac.ip : 'Nincs megadott IP'}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action, State } from 'vuex-class';
import MacAddress from '../models/macAddress';

@Component({})
export default class MacAddresses extends Vue {
  @Action('fetchMacs') public fetch: any;
  @Getter('allMacs') public allMacs: MacAddress[];

  public mounted() {
    this.fetch();
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
  font-weight: bold;
}
table {
  width: 100%;
  box-shadow: 0 0 10px 1px black;
}
table thead tr th {
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
  border: 1px solid white;
  background-color: #6a2cfa;
  color: white;
  transition-duration: 0.5s;
}
table thead tr th:hover {
  font-size: 1.3rem;
  transition-duration: 0.5s;
}
table tbody tr td {
  padding: 0.5rem;
  text-align: center;
  border: 1px solid white;

  color: white;
  transition-duration: 0.5s;
}
table tbody tr:nth-child(even) {
  background-color: #ab86ff;
  transition-duration: 0.5s;
}
table tbody tr:nth-child(odd) {
  background-color: #9569fd;
  transition-duration: 0.5s;
}
table tbody tr:nth-child(even):hover {
  background-color: #3d03c2;
  transition-duration: 0.5s;
}
table tbody tr:nth-child(odd):hover {
  background-color: #3d03c2;
  transition-duration: 0.5s;
}
</style>