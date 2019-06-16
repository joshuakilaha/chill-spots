<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h2 class="primary--text">{{spot.title}}</h2>
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
            }
        }
    }
</script>