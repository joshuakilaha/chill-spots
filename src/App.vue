<template>

  <v-app>

    <v-navigation-drawer v-model="sideRight" temporary absolute>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
        :key="item.title"
        :to ="item.link">
          <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
            <v-list-title-content>{{item.title}}</v-list-title-content>
        </v-list-tile>

        <v-list-tile v-if="userisAuthenticated" @click="onLogout">
          <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-title-content>Logout</v-list-title-content>
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
        :to="item.link">
         {{item.title}}
          <v-icon right>{{item.icon}}</v-icon>
        </v-btn>

        <v-btn flat
          v-if="userisAuthenticated"
          @click="onLogout">
          Logout
          <v-icon right>exit_to_app</v-icon>
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
    }
  },
    computed: {
      menuItems (){
          let menuItems = [
              {icon: 'face', title: 'Sign up',link: '/Signup' },
              {icon: 'lock_open', title: 'Sign in', link: '/Signin'},
          ]
          if (this.userisAuthenticated){
               menuItems = [
                   {icon:'visibility', title: 'View Spots', link: '/spots'},
                   {icon: 'room', title: 'Organize Spots',link: '/CreateSpots'},
                   {icon: 'person', title: 'Profile', link: '/Profile'},
               ]
          }
          return menuItems
      },
        userisAuthenticated (){
          return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
    },
    methods: {
      onLogout (){
          this.$store.dispatch('logout')
      }
    }
}
</script>
