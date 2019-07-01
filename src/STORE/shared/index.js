
export default {
    state: {

        loading: false,
        error: null

    },
    mutations: {
      setLoading (state,paylaod){
            state.loading = paylaod
        },
        setError(state, payload){
            state.error = payload
        },
        clearError (state){
            state.error = null
        }

    },
    actions: {
       clearError ({commit}){
            commit('clearError')
        }

    },

    getters:{

        loading(state){
            return state.loading
        },
        error(state){
            return state.error
        }
    }
}
