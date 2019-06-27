<template>
    <v-container>

        <v-layout row justify-space-around v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <div class="text-xs-center">
                    <v-progress-circular
                            indeterminate
                            color="primary"
                            :width="7"
                            :size="70">
                    </v-progress-circular>
                </div>
            </v-flex>
        </v-layout>

        <v-layout row wrap v-else>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h2 class="primary--text">{{spot.title}}</h2>
                        <template v-if="userIsCreator">
                            <v-spacer></v-spacer>
                            <app-edit-spot :spot="spot"></app-edit-spot>
                        </template>
                    </v-card-title>
                    <v-card-media
                            :src="spot.imageUrl"
                            height="400px">
                    </v-card-media>
                    <v-card-text>
                       <div class="info--text">{{spot.date | date}}- {{spot.location}}</div>
                        <div>{{spot.description}}</div>
                    </v-card-text>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn class="primary">Register</v-btn>
                    </v-card-action>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: ['id'],
        computed: {
            spot (){
                return this.$store.getters.loadedspot(this.id)
            },
            loading(){
                return this.$store.getters.loading
            },
            userIsAuthenticated (){
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            userIsCreator (){
                if (!this.userIsAuthenticated){
                    return false
                }
                return this.$store.getters.user.id === this.spot.creatorId
            }

        }
    }
</script>