<template>
    <v-container>
        <v-layout row wrap justify-space-around>
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
            <v-btn large router to="/spots" class="primary">Explore Spots</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn large router to="/CreateSpots" class="primary">Organize Spots</v-btn>
            </v-flex>
        </v-layout>

        <v-layout row justify-space-around>
            <v-flex xs12 class="text-xs-center">
                <div class="text-xs-center">
                    <v-progress-circular
                            indeterminate
                            color="primary"
                    :width="7"
                    :size="70"
                    v-if="loading">
                    </v-progress-circular>
                </div>
            </v-flex>
        </v-layout>

        <v-layout row wrap justify-space-around class="mt-2" v-if ="!loading">
            <v-flex xs10 class="align-content-center">
                <v-carousel style="cursor: pointer"
                        delimiter-icon="stop"
                        prev-icon="mdi-arrow-left"
                        next-icon="mdi-arrow-right">

                    <v-carousel-item
                            v-for="spot in spots"
                            :key="spot.id"
                            @click="onloadSpot(spot.id)"
                            :src="spot.imageUrl">
                        <div class="title">
                            {{ spot.title }}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>

        <v-layout row wrap justify-space-around class="mt-2">
            <v-flex xs12 sm6 class="text-xs-center">
                <p>Join our spotss</p>
            </v-flex>
        </v-layout>

    </v-container>

</template>

<script>

  export default {
    components: {

    },
        computed: {
        spots() {
            return this.$store.getters.featuredspots
        },
            loading(){
            return this.$store.getters.loading
            }
        },


      methods:{
        onloadSpot (id){
            this.$router.push('/spots/' +id)

        }
      }
  }
</script>


<style scoped>
    .title{
        position: absolute;
        bottom: 50px;
        color: white;
        font-size: 3px;
        padding-left: 45%;
        padding-bottom: 5px;
    }

</style>
