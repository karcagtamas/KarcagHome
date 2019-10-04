<template>
  <v-app id="app">
    <Navigator></Navigator>
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer app>
      Created by: Karcag Tamas --->&nbsp;
      <a href="http://karcags.hu">karcags</a>
    </v-footer>
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
</style>
