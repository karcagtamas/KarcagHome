import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Home from './views/Home.vue';
import MacAddresses from './views/MacAddresses.vue';
import Login from './components/Login.vue';
import LoginService from './services/LoginService';

Vue.use(Router);

const router = new Router({
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
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});

router.beforeEach((to: Route, from: Route, next) => {
  LoginService.isLoggedIn().then((res: boolean) => {
    if (res) {
      if (to.name === 'login') {
        next(false);
      } else {
        next();
      }
    } else {
      if (to.name === 'login') {
        next();
      } else {
        next('/login');
      }
    }
  });
});

export default router;
