<template>
    <v-dialog  persistent v-model="registerDialog">
        <v-btn primary accent slot="activator">
          {{userIsRegistered ? 'Unregister' : 'Register'}}
        </v-btn>
        <v-card>
            <v-container >
                <v-layout justify-space-around>
                    <v-flex xs12>
                        <v-card-title v-if="userIsRegistered">Unregister from Spot</v-card-title>
                        <v-card-title v-else>Register for Spot</v-card-title>
                    </v-flex>
                </v-layout>

                <v-layout justify-space-around>
                    <v-flex xs12>
                       <v-card-text>You can change your decision later</v-card-text>
                    </v-flex>
                </v-layout>

                <v-layout justify-space-around>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat class="blue--text darken-1" @click="registerDialog = false">Cancel</v-btn>
                            <v-btn class="green--text" flat @click="onAgree">Confirm</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>



    export default {
        props:['spotId'],

        data(){
            return {
                registerDialog: false
            }
        },
    computed :{
            userIsRegistered(){
                return this.$store.getters.user.registeredspots.findIndex(spotId => {
                    return spotId === this.spotId
                }) >= 0
            }
        },
        methods: {
            onAgree(){
                if(this.userIsRegistered){
                    this.$store.dispatch('unregisterUserFromSpot', this.spotId)
                } else {
                    this.$store.dispatch('registerUserForSpot', this.spotId)
                }
            }
        }
    }
</script>