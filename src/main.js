import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import DateFilter from './filters/date'


Vue.config.productionTip = false;

Vue.filter('date', DateFilter)

new Vue({
  router,
  store,
  render: h => h(App),
    created (){
    firebase.initializeApp({

    })
    }
}).$mount('#app');
