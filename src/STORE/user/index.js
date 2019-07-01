import * as firebase from 'firebase'

export default{
    state: {
        user: null,


    },
    mutations: {
        registerUserForSpot(state,payload){
            const id = payload.id
            if (state.user.registeredspots.findIndex(spot => spot.id === id) >= 0){
                return
            }
            state.user.registeredspots.push(id)
            state.user.fbkey[id] = payload.fbkey
        },

        unregisterUserFromSpot(state,payload){
            const registeredspots = state.user.registeredspots
            registeredspots.splice(registeredspots.findIndex(spot => spot.id === payload), 1)
            Reflect.deleteProperty(state.user.fbkey,payload)
        },


        setUser(state,payload){
            state.user = payload
        }

    },
    actions: {

        registerUserForSpot({commit, getters},payload){
            commit('setLoading',true)
            const user = getters.user
            firebase.database().ref('/users/' + user.id).child('/registration/').push(payload)
                .then((data) =>{
                    commit('setLoading', false)
                    commit('registerUserForSpot', {id: payload, fbkey: data.key})
                })
                .catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                    commit('setLoading', false)
                })
        },

        unregisterUserFromSpot({commit,getters},payload){
            commit('setLoading', true)
            const  user = getters.user
            if(!user.fbkey){
                return
            }
            const fbkey = user.fbkey[payload]
            firebase.database().ref('/users/'+ user.id + '/registration/').child(fbkey)
                .remove()
                .then(() => {
                    commit('setLoading', false)
                    commit('unregisterUserFromSpot', payload)
                })
                .catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                    commit('setLoading', false)
                })


        },

        signUp({commit},payload) {
            commit('setLoading',true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
                .then(
                    user => {
                        commit('setLoading',false)
                        const newuser ={
                            id:user.uid,
                            registeredspots: [],
                            fbkey:{}
                        }
                        commit('setUser', newuser)
                    }
                ).catch(
                error => {
                    commit('setLoading',false)
                    commit('setError',error)
                }
                //  console.log(error)
                //}
            )
        },
        signIn({commit},payload){
            commit('setLoading',true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
                .then(
                    user => {
                        commit('setLoading',false)
                        const newUser = {
                            id:user.uid,
                            registeredspots:[],
                            fbkey:{}
                        }
                        commit('setUser',newUser)
                    }
                ).catch(
                error => {
                    commit('setLoading',false)
                    commit('setError',error)
                }
            )
        },
        autoSignIn({commit}, payload){
            commit('setUser',{
                id:payload.uid,
                registeredspots: [],
                fbkey:{}
            })
        },
        fetchUserData({commit, getters}){
            commit('setLoading', true)
            firebase.database().ref('/users/' + getters.user.id + '/registration/').once('value')
                .then(data => {
                    const  dataPairs = data.val()
                    let registeredspots = []
                    let swappedPairs = {}
                    for (let key in dataPairs){
                        registeredspots.push(dataPairs[key])
                        swappedPairs[dataPairs[key]] = key
                    }
                    const updatedUser = {
                        id: getters.user.id,
                        registeredspots: registeredspots,
                        fbkey: swappedPairs
                    }
                    commit('setLoading', false)
                    commit('setUser', updatedUser)
                })
                .catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                    commit('setLoading', false)
                })
        },

        logout({commit}){
            firebase.auth().signOut()
            commit('setUser', null)
        }

    },

    getters:{

        user (state){
            return state.user
        }
    }
}
