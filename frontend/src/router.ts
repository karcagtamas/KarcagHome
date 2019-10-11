import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Home from './views/Home.vue';
import MacAddresses from './views/MacAddresses.vue';
import Login from './components/Login.vue';
import LoginService from './services/LoginService';
import Movies from './views/Movies.vue';
import Profile from './views/Profile.vue';
import MyMovies from './views/MyMovies.vue';
import SeriesView from './views/SeriesView.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    // Home page
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // Mac Address page
    {
      path: '/macs',
      name: 'macs',
      component: MacAddresses
    },
    // Login page
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // Movie page
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    // Profile page
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    // My movies page
    {
      path: '/my-movies',
      name: 'my-movies',
      component: MyMovies
    },
    // Series page
    {
      path: '/series',
      name: 'series',
      component: SeriesView
    }
  ]
});

// Check routing
// If the user is logged in, he/she can access to all page
// If not, the page will redirect the user to the login page
router.beforeEach((to: Route, from: Route, next) => {
  // Check is logged in status
  LoginService.isLoggedIn().then((res: boolean) => {
    // Is logged in
    if (res) {
      // Destination is the login page (block)
      if (to.name === 'login') {
        next(false);
        // Enable access
      } else {
        next();
      }
      // Is not logged in
    } else {
      // Destination is the login page (enable)
      if (to.name === 'login') {
        next();
        // Not login page -> redirect to the login page
      } else {
        next('/login');
      }
    }
  });
});

export default router;
