<template>
  <v-app id="app">
    <Navigator></Navigator>
    <div class="view">
      <router-view />
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navigator from './components/Navigator.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/vuetify/dist/vuetify.min.css';

@Component({ components: { Navigator } })
export default class App extends Vue {}
</script>

<style>
body {
  background-color: #bcd5f1;
}
#app {
  width: 100%;
  font-family: 'Inconsolata', monospace;
}
.view {
  padding: 2rem;
}
</style>
