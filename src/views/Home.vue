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

        <v-layout row wrap justify-space-around class="mt-2">
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
                <p>Join our spots</p>
            </v-flex>
        </v-layout>

    </v-container>

</template>

<script>

  export default {
    components: {

    },
        data(){
            return{
                spots: [
                    {imageUrl: 'https://photos.mandarinoriental.com/is/image/MandarinOriental/paris-2017-home?wid=2880&hei=1280&fmt=jpeg&crop=9,336,2699,1200&anchor=1358,936&qlt=75,0&fit=wrap&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72',
                        id: '1321321', title: 'Paris'},
                    {imageUrl: 'http://www.umbatosafaris.com/images/mombasa-beach-holiday-tour.jpg',
                        id: '13114', title: 'Mombasa'},
                    {imageUrl: 'https://wallpaperaccess.com/full/123454.jpg',
                        id: '1321321', title: 'New York'},
                ]
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
