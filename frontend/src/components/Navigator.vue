<template>
  <div>
    <div class="frame col-12">
      <div class="nav row">
        <router-link to="/">
          <div class="title" title="Fő oldal">Karcag Home</div>
        </router-link>
        <router-link to="macs">
          <div title="MAC címek">MAC címek</div>
        </router-link>
      </div>
    </div>
    <div class="denethor"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Navigator extends Vue {}
</script>

<style scoped>
.frame {
  margin: 0;
  padding: 0;
  width: 100%;
  position: fixed;
}

.nav {
  background-color: #6c34f0;
  color: #fff;
  font-size: 1.5rem;
  margin: 0;
  padding: 0.4rem;
}

.nav div {
  margin: 0 1rem 0 1rem;
  cursor: pointer;
  border-radius: 10px;
  padding: 0.1rem 0.8rem 0.1rem 0.8rem;
  color: white;
  text-decoration: unset !important;
}

.nav div:hover {
  background-color: #f7a4a4;
  color: #000;
  transition-duration: 0.5s;
  box-shadow: 0 0 10px 0px #000;
  text-decoration: unset !important;
}

.nav .title {
  font-size: 1.6rem;
  font-weight: bold;
}

.denethor {
  height: 3rem;
}
</style>