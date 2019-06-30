import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedspots: [],

      user: null,
      loading: false,
      error: null

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
            registeredspots.slice(registeredspots.findIndex(spot => spot.id === payload), 1)
            Reflect.deleteProperty(state.user.fbkey,payload)
        },

      setLoadedSpots (state,payload){
          state.loadedspots= payload
      },
      createspot (state, payload){
          state.loadedspots.push(payload)
      },
      updateSpot(state,payload){
          const spot = state.loadedspots.find(spot => {
              return spot.id === payload.id
          })
          if(payload.title){
              spot.title = payload.title
          }
          if(payload.description){
              spot.description = payload.description
          }
          if(payload.date){
              spot.date = payload.date
          }
      },
      setUser(state,payload){
          state.user = payload
      },
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

      loadspots ({commit}){
          commit('setLoading',true)
        firebase.database().ref('spots').once('value')
            .then((data) =>{
                const spots = []
                const obj = data.val()
                for (let key in obj){
                    spots.push({
                        id: key,
                        title: obj[key].title,
                        location:obj[key].location,
                        imageUrl:obj[key].imageUrl,
                        description:obj[key].description,
                        date:obj[key].date,
                        creatorId:obj[key].creatorId
                    })
                }
                commit('setLoadedSpots', spots)
                commit('setLoading',false)
                })
            .catch(
                (error) => {
                    commit('setLoading',false)
                     commit('setError',error)
                }
            )
      },
      createspot ({commit, getters}, payload){
          const spot = {
              title: payload.title,
              location: payload.location,
              description: payload.description,
              date: payload.date.toISOString(),
              creatorId: getters.user.id
          }
          let imageUrl
          let key

          firebase.database().ref('spots').push(spot)
              .then((data) => {
                  key = data.key
                  return key
              })
              .then(key => {
                  const filename = payload.image.name
                  const  ext = filename.slice(filename.lastIndexOf('.'))
                  return firebase.storage().ref('spots/' + key + '.' + ext).put(payload.image)
              })

          .then(fileData => {

          let imagePath = fileData.metadata.fullPath
          return firebase.storage().ref().child(imagePath).getDownloadURL()
          .then(url => {
          imageUrl = url
              // eslint-disable-next-line no-console
          console.log('file available at', url)
          return firebase.database().ref('spots').child(key).update({imageUrl: imageUrl})
          })

          })
          .then(() => {
              commit('createspot',{
                  ...spot,
                  imageUrl: imageUrl,
                  id: key
              })
          })
              .catch(
                  error => { commit('setError',error) })

          ///storing in firebase

      },

      UpdateSpotData({commit},payload){
          commit('setLoading', true)
          const updateObj = {}
          if (payload.title){
              updateObj.title = payload.title
          }
          if(payload.description) {
              updateObj.description = payload.description
          }
          if(payload.date){
              updateObj.date = payload.date
          }
           firebase.database().ref('spots').child(payload.id).update(updateObj)
              .then(() => {
                  commit('setLoading',false)
                  commit('updateSpot', payload)
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

      logout({commit}){
          firebase.auth().signOut()
          commit('setUser', null)
        },
      clearError ({commit}){
          commit('clearError')
      }

  },

  getters:{
      loadedspots (state) {
        return state.loadedspots.sort((spotA, spotB) => {
          return spotA.date > spotB.date
        })
      },

      featuredspots(state, getters){
          return getters.loadedspots.slice(0,5)
      },

      loadedspot (state){
        return (spotId) => {
          return state.loadedspots.find((spot)=>{
            return spot.id === spotId
          })
        }
      },

      user (state){
          return state.user
      },
      loading(state){
        return state.loading
      },
      error(state){
          return state.error
      }
  }
})
