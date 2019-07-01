import Vue from 'vue'
import Vuex from 'vuex'
import spot from './STORE/spot'
import user from './STORE/user'
import shared from './STORE/shared'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        spot: spot,
        user: user,
        shared: shared
    }
})

