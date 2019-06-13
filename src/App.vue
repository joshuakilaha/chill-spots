<template>

  <v-app>

    <v-navigation-drawer v-model="sideRight" temporary absolute>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
        :key="item.title"
        router
        :to ="item.link">
          <v-list-tile-action>
          </v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
            <v-list-title-content>{{item.title}}</v-list-title-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="light-blue lighten-3">
      <v-toolbar-side-icon @click="sideRight = !sideRight" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-tittle>
        <router-link to="/" tag="span" style="cursor: pointer">Chill Spots</router-link>
      </v-toolbar-tittle>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
                flat v-for="item in menuItems"
                :key="item.title"
        router
        :to="item.link">
         {{item.title}}
          <v-icon right>{{item.icon}}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <router-view>

      </router-view>
    </main>
  </v-app>

</template>

<script>


export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      //
        sideRight: false,
        menuItems: [
            {icon:'visibility', title: 'View Sports', link: '/spots'},
            {icon: 'room', title: 'Organize Sports',link: '/CreateSpots'},
            {icon: 'person', title: 'Profile', link: '/Profile'},
            {icon: 'face', title: 'Sign up',link: '/Signup' },
            {icon: 'lock_open', title: 'Sign in', link: '/Signin'},
            ]
    }
  }
}
</script>
