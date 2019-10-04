<template>
  <div>
    <h1>MAC Címek</h1>

    <v-card raised>
      <v-card-title>MAC címek</v-card-title>
      <v-simple-table dense fixed-header height="25vh">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">MAC</th>
              <th class="text-left">Tulaj</th>
              <th class="text-left">Név</th>
              <th class="text-left">Eszköz név</th>
              <th class="text-left">IP</th>
              <th class="text-left">Művletek</th>
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
                <v-btn class="m-1" color="error" fab x-small @click="deleteMacAddress(mac.id)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn class="m-1" color="warning" fab x-small @click="modifyMac(mac)">
                  <v-icon>mdi-border-color</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <div class="my-3">
      <v-btn raised color="primary" v-if="!newMac" @click="newMac = true; onModify = false">Új MAC</v-btn>
    </div>
    <v-card raised v-if="newMac || onModify" class="p-3 add-new-address-panel">
      <v-card-title>Új MAC cím</v-card-title>
      <v-alert type="error" dismissible="true" border="left" v-if="error">
        <strong>HIBA!</strong>
        {{error}}
      </v-alert>
      <v-form>
        <v-text-field
          v-model="newMacAddress.address"
          :counter="17"
          label="MAC"
          required
          outlined
          dense
          clearable
        ></v-text-field>
        <v-text-field
          v-model="newMacAddress.owner"
          :counter="100"
          label="Tulaj"
          required
          outlined
          dense
          clearable
        ></v-text-field>
        <v-text-field
          v-model="newMacAddress.name"
          :counter="100"
          label="Név"
          required
          outlined
          dense
          clearable
        ></v-text-field>
        <v-text-field
          v-model="newMacAddress.deviceName"
          :counter="100"
          label="Eszköz név"
          required
          outlined
          dense
          clearable
        ></v-text-field>
        <v-text-field v-model="newMacAddress.ip" :counter="15" label="IP" outlined dense clearable></v-text-field>
        <div>
          <v-btn class="mr-2" raised color="warning" @click="back">Vissza</v-btn>
          <v-btn class="ml-2" raised color="success" @click="save">Mentés</v-btn>
        </div>
      </v-form>
    </v-card>
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
    this.onModify = false;
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
.add-new-address-panel {
  margin: 2rem 20rem 0 20rem;
}
</style>