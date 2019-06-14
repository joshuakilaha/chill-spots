import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import spots from './components/Spots/spots'
import CreateSpots from './components/Spots/CreateSpots'
import spot from './components/Spots/spot'
import Profile from './components/User/Profile'
import Signup from './components/User/Signup'
import Signin from './components/User/Signin'




Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
      {
          path: '/spots',
          name: 'spots',
          component: spots
      },

      {
          path: '/CreateSpots',
          name: 'spots/create',
          component: CreateSpots
      },

      {
          path: '/spots/:id',
          name: 'spots/spot',
          props: true,
          component: spot
      },

      {
          path: '/Profile',
          name: 'Profile',
          component: Profile
      },

      {
          path: '/Signin',
          name: 'Signin',
          component: Signin
      },

      {
          path: '/Signup',
          name: 'Signup',
          component: Signup
      },
  ],mode : 'history',
})
