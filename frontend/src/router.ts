import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MacAddresses from './views/MacAddresses.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/macs',
      name: 'macs',
      component: MacAddresses
    }
  ]
});
