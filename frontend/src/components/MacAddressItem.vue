<template>
  <div>{{address.address}}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import MacAddress from '../models/macAddress';

@Component({})
export default class MacAddressItem extends Vue {
  @Prop() public address: MacAddress;
}
</script>

<style>
</style>