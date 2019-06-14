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
                       <div class="info--text">{{spot.date}}</div>
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Accusantium atque autem doloremque ducimus et incidunt ipsum libero nostrum,
                            quasi voluptatum. Accusamus adipisci architecto distinctio doloremque ipsa
                            laudantium modi nesciunt, provident!</div>
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