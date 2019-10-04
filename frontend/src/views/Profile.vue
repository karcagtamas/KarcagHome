<template>
  <div>{{user.username}}</div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter, State } from 'vuex-class';
import User from '../models/user';

@Component({})
export default class Profile extends Vue {
  @Action('fetchUser') public fetchUser: any;
  @Getter('user') public user: User;

  public mounted() {
    this.fetchUser(this.user.id);
  }
}
</script>
<style scoped>
</style>