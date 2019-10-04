<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon>
        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-if="!isLoggedIn">
              <v-list-item-title>
                <router-link to="/login">
                  <div class="link" title="Bejelentkezés">Bejelentkezés</div>
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="isLoggedIn">
              <v-list-item-title>
                <router-link to="/macs">
                  <div class="link" title="MAC Címek">MAC Címek</div>
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="isLoggedIn">
              <v-list-item-title>
                <router-link to="/movies">
                  <div class="link" title="Filmek">Filmek</div>
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <a href="http://karcags.hu" target="_blank">
                  <div class="link" title="karcags.hu">karcags</div>
                </a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/">
          <div class="link main" title="Fő oldal">Karcag Home</div>
        </router-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-menu left bottom v-if="isLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar>
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <strong>Felhasználónév:</strong>
              {{user.username}}
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <strong>Utolsó bejelentkezés:</strong>
              {{user.lastLogin}}
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <strong>Név:</strong>
              {{user.name}}
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <strong>E-mail:</strong>
              {{user.email}}
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="Saját profil" @click="openProfile">
            <v-list-item-title>
              <v-icon>mdi-account-circle</v-icon>&nbsp;Profil
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout" title="Kijelentkezés">
            <v-list-item-title>
              <v-icon>mdi-location-exit</v-icon>&nbsp;Kijelentkezés
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginService from '../services/LoginService';
import { Getter, Action, State } from 'vuex-class';
import router from '../router';
import User from '../models/user';

@Component({})
export default class Navigator extends Vue {
  @Action('fetchUser') public fetchUser: any;
  @Action('clearUser') public clearUser: any;
  @Action('setIsLoggedIn') public setIsLoggedIn: any;
  @Getter('user') public user: User;
  @Getter('isLoggedIn') public isLoggedIn: boolean;

  public created() {
    LoginService.isLoggedIn()
      .then(res => {
        this.setIsLoggedIn(res);
        if (this.isLoggedIn) {
          const userId = parseInt(
            localStorage.getItem('userId') || '0',
            undefined
          );
          this.fetchUser(userId);
        }
      })
      .catch(err => {
        this.setIsLoggedIn(false);
      });
  }

  public openProfile() {
    router.replace('/profile');
  }

  public logout(): void {
    LoginService.logout().then(() => {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      this.setIsLoggedIn(false);
      this.clearUser();
      router.replace('/login');
    });
  }
}
</script>

<style scoped>
.link {
  color: #000;
}
.link.main {
  color: white !important;
}
a:hover {
  text-decoration: unset;
}
</style>