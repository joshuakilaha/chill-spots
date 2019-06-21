<template>
   <v-container>
       <v-layout row wrap justify-space-round v-for="spot in spots" :key="spot.id" class="mb-2">
           <v-flex xs12 sm5 md9 offset-sm1 offset-md2 >
               <v-card class="info">
                   <v-container fluid>
                       <v-layout row wrap justify-space-round>
                           <v-flex xs5 sm1 md3>
                               <v-card-media
                                   :src="spot.imageUrl"
                                   height="130px">
                               </v-card-media>
                           </v-flex>

                           <v-flex xs7 sm8 md9>
                               <v-card-tittle primary-tittle >
                                   <div class="title">
                                       <h2 class="white--text mb-3">{{spot.title}}</h2>
                                       <div>{{spot.date}}</div>
                                   </div>
                               </v-card-tittle>
                               <v-card-action >
                                   <v-btn  :to="'/spots/' + spot.id">
                                       View Spots
                                       <v-icon right>arrow_forward</v-icon>
                                   </v-btn>
                               </v-card-action>
                           </v-flex>
                       </v-layout>
                   </v-container>
               </v-card>
           </v-flex>
       </v-layout>
   </v-container>
</template>

<script>
    export default {
        computed: {
            spots() {
                return this.$store.getters.loadedspots
            }
        }
    }
</script>

<style>
    .title{
        padding-left: 20px;
    }
</style>