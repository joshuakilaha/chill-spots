import * as firebase from 'firebase'

export default {
    state: {
        loadedspots: [],


    },
    mutations: {
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
        }
    },
    actions: {
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

    }
}
