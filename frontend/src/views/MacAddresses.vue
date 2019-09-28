<template>
  <div>
    <h1>MAC Címek</h1>
    <button class="btn btn-primary mb-3" v-if="!newMac" @click="newMac = true">Új MAC</button>
    <div v-if="newMac">
      <div class="form-group">
        <label for="mac">Mac</label>
        <input class="form-control" type="text" name="mac" />
      </div>
      <div class="form-group">
        <label for="owner">Tulaj</label>
        <input class="form-control" type="text" name="owner" />
      </div>
      <div class="form-group">
        <label for="name">Név</label>
        <input class="form-control" type="text" name="name" />
      </div>
      <div class="form-group">
        <label for="device">Eszköz név</label>
        <input class="form-control" type="text" name="device" />
      </div>
      <div class="form-group">
        <label for="ip">IP</label>
        <input class="form-control" type="text" name="ip" />
      </div>
      <button class="btn btn-warning mb-3 mr-1" @click="back">Vissza</button>
      <button class="btn btn-success mb-3 ml-1" @click="save">Mentés</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Cím</th>
          <th>Tulaj</th>
          <th>Eszköz</th>
          <th>Eszköz név</th>
          <th>IP</th>
          <th>Művletek</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mac in allMacs" :key="mac.id">
          <td>{{mac.address}}</td>
          <td>{{mac.owner}}</td>
          <td>{{mac.name}}</td>
          <td>{{mac.deviceName}}</td>
          <td>{{mac.ip ? mac.ip : 'Nincs megadott IP'}}</td>
          <td>
            <button class="btn btn-danger mr-1" @click="deleteMac">X</button>
            <button class="btn btn-warning ml-1" @click="modifyMac">X</button>
          </td>
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
  public newMac: boolean = false;
  public newMacAddress: MacAddress = new MacAddress('', '', '', '');

  public mounted() {
    this.fetch();
  }

  public back() {
    this.newMacAddress = new MacAddress('', '', '', '');
    this.newMac = false;
  }

  public save() {
    window.alert('Save');
  }

  public deleteMac() {}

  public modifyMac() {}
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