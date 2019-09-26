<template>
  <div>
    <div v-for="mac in allMacs" :key="mac.id">
      <MacAddressItem :address="mac"></MacAddressItem>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action, State } from 'vuex-class';
import MacAddress from '../models/macAddress';
import MacAddressItem from '../components/MacAddressItem.vue';

@Component({ components: { MacAddressItem } })
export default class MacAddresses extends Vue {
  @Action('fetchMacs') public fetch: any;
  @Getter('allMacs') public allMacs: MacAddress[];

  public mounted() {
    this.fetch();
  }
}
</script>