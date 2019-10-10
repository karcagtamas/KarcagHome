<template>
  <!-- Home page -->
  <div class="home">
    <!-- Title -->
    <h1>Karcag Home</h1>
    <!-- Existing pages -->
    <v-card raised class="p-4">
      <v-card-title>Oldalak</v-card-title>
      <v-expansion-panels inset>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <strong>MAC címek</strong>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Az oldalon lehetőség van a MAC címek, illetve azoknak a tulajdonosainak és eszközeiknek kapcsolatát figyelemmel követni és szerkeszteni.</p>
            <router-link to="/macs">
              <v-btn color="deep-purple accent-4" dark>Weboldal megnyitása</v-btn>
            </router-link>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <strong>Filmek</strong>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Filmeket tudsz felvenni, szerkeszteni és beállítani magadnak, amiket ezután a saját filmjeid oldalon megnézettként tudsz majd jelölni.</p>
            <router-link to="/movies">
              <v-btn color="deep-purple accent-4" dark>Weboldal megnyitása</v-btn>
            </router-link>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <strong>Saját Filmek</strong>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Folyamatban...</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <strong>Sorozatok</strong>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Folyamatban...</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <strong>Saját Sorozatok</strong>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Folyamatban...</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <!-- Updates -->
    <v-card raised class="p-4">
      <v-card-title>Frissítések</v-card-title>
      <v-expansion-panels inset>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <strong>2019.10. - Bejelentkezés, dizájn, MAC</strong>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>Elkészültek a weboldal alapjai. Csak érvényes felhasználóval lehet hozzáférni mostantól az oldalhoz és lehetőség van a kijelentkezésre is.</p>
            <p>Új stílust kapott az oldal a komfortosabb érzés miatt. A Menu a navigátor bal oldalán található pont oszlop alatt érhető el. A felhasználóhoz kapcsolodó dolgok pedig szintén a navigátoron találhatóak, viszont a ez a jobb oldalon található profil ikon alatt van.</p>
            <p>Elkészült a MAC cím kezelésére szánt oldal rész. Lehetőség van megtekinteni a jelenleg felvitteket, illetve adhatunk hozzá újat, módosíthatjuk a hibásat, illetve törölhetjük a régit.</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {}
</script>
<style scoped>
a:hover {
  text-decoration: unset;
}
p {
  text-align: justify;
}
</style>
