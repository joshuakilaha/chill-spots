import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import DateFilter from './filters/date'
import Alert from './components/shared/alert'


Vue.config.productionTip = false;

Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)

new Vue({
  router,
  store,
  render: h => h(App),
    created (){
    firebase.initializeApp({
            apiKey: 'AIzaSyBW3X9aOPnJacXhLJaMt3UR4JXGWc57z8Y',
            authDomain: 'chillspots-b9f0f.firebaseapp.com',
            databaseURL: 'https://chillspots-b9f0f.firebaseio.com',
            projectId: 'chillspots-b9f0f',
            storageBucket: 'chillspots-b9f0f.appspot.com',
            messagingSenderId: '892952378064',
            appId: '1:892952378064:web:666041cef0df89f4'
    })
    }

}).$mount('#app');
