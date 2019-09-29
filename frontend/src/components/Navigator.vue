<template>
  <div>
    <div class="frame col-12">
      <div class="nav row">
        <router-link to="/">
          <div class="title" title="Fő oldal">Karcag Home</div>
        </router-link>
        <router-link to="macs" v-if="isLoggedIn">
          <div title="MAC címek">MAC címek</div>
        </router-link>
        <router-link to="login" v-if="!isLoggedIn">
          <div title="Bejelentkezés">Bejelentkezés</div>
        </router-link>
        <div title="Kijelentkezés" v-if="isLoggedIn" @click="logout">Kijelentkezés</div>
      </div>
    </div>
    <div class="denethor"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginService from '../services/LoginService';

@Component({})
export default class Navigator extends Vue {
  public isLoggedIn: boolean = false;

  public created() {
    LoginService.isLoggedIn()
      .then(res => {
        this.isLoggedIn = res;
      })
      .catch(err => {
        this.isLoggedIn = false;
      });
  }

  public logout(): void {
    LoginService.logout().then(() => {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      this.isLoggedIn = false;
    });
  }
}
</script>

<style scoped>
.frame {
  margin: 0;
  padding: 0;
  width: 100%;
  position: fixed;
}

.nav {
  background-color: #9569fd;
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
  background-color: #6a2cfa;
  transition-duration: 0.5s;
  box-shadow: 0 0 10px 0px #fff;
  text-decoration: unset !important;
}

.nav a:hover {
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