<template>
  <div>
    <h1>MAC Címek</h1>
    <div class="my-3">
      <v-btn raised color="primary" v-if="!newMac" @click="newMac = true; onModify = false">Új MAC</v-btn>
    </div>
    <div v-if="newMac || onModify" class="form-div">
      <v-alert type="error" dismissible="true" border="left" v-if="error">
        <strong>HIBA!</strong>
        {{error}}
      </v-alert>
      <div class="form-group">
        <label for="mac">Mac</label>
        <input class="form-control" type="text" name="mac" v-model="newMacAddress.address" />
      </div>
      <div class="form-group">
        <label for="owner">Tulaj</label>
        <input class="form-control" type="text" name="owner" v-model="newMacAddress.owner" />
      </div>
      <div class="form-group">
        <label for="name">Név</label>
        <input class="form-control" type="text" name="name" v-model="newMacAddress.name" />
      </div>
      <div class="form-group">
        <label for="device">Eszköz név</label>
        <input class="form-control" type="text" name="device" v-model="newMacAddress.deviceName" />
      </div>
      <div class="form-group">
        <label for="ip">IP</label>
        <input class="form-control" type="text" name="ip" v-model="newMacAddress.ip" />
      </div>
      <div>
        <v-btn class="mr-2" raised color="warning" @click="back">Vissza</v-btn>
        <v-btn class="ml-2" raised color="success" @click="save">Mentés</v-btn>
      </div>
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
            <button class="btn btn-danger mr-1" @click="deleteMacAddress(mac.id)">X</button>
            <button class="btn btn-warning ml-1" @click="modifyMac(mac)">&#9998;</button>
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
  @Action('addMac') public addMac: any;
  @Action('deleteMac') public deleteMac: any;
  @Action('updateMac') public updateMac: any;
  public newMac: boolean = false;
  public newMacAddress: MacAddress = new MacAddress('', '', '', '');
  public error: string = '';
  public onModify: boolean = false;

  public mounted() {
    this.fetch();
  }

  public back(): void {
    this.newMacAddress = new MacAddress('', '', '', '');
    this.newMac = false;
  }

  public save(): void {
    const address = this.newMacAddress;
    if (!address.address && address.address.length !== 17) {
      this.setAlert('A MAC cím kitöltése kötelező');
      return;
    }
    if (!address.deviceName) {
      this.setAlert('Az eszköz név kitöltése kötelező');
      return;
    }
    if (!address.owner) {
      this.setAlert('A tulajdonos kitöltése kötelező');
      return;
    }
    if (!address.name) {
      this.setAlert('Az eszköz kitöltése kötelező');
      return;
    }
    if (!address.deviceName) {
      this.setAlert('Az eszköz név kitöltése kötélező');
      return;
    }
    if (this.onModify) {
      this.updateMac(address);
      this.onModify = false;
    } else {
      this.addMac(address);
      this.newMac = false;
    }
    this.newMacAddress = new MacAddress('', '', '', '');
  }

  public deleteMacAddress(id: number): void {
    this.deleteMac(id);
  }

  public modifyMac(address: MacAddress) {
    this.onModify = true;
    this.newMacAddress = { ...address };
  }

  public setAlert(value: string): void {
    this.error = value;
    setTimeout(() => (this.error = ''), 2000);
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
  font-weight: bold;
  transition-duration: 0.5s;
}
h1:hover {
  transition-duration: 0.5s;
  transform: scale(1.5, 1.5);
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
.form-div {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 1px #000;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solod #333;
}
.form-div label {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>