<template>
   <v-container>
       <v-layout row wrap justify-space-round>
           <v-flex xs12 sm3 md10 offset-sm1 offset-md2 >
               <v-card class="info">
                   <v-container fluid>
                       <v-layout row wrap justify-space-round>
                           <v-flex xs5 sm1 md3>
                               <v-card-media
                                   src="https://wallpaperaccess.com/full/123454.jpg"
                                   height="130px">
                               </v-card-media>
                           </v-flex>

                           <v-flex xs7 sm8 md9>
                               <v-card-tittle primary-tittle >
                                   <div class="title">
                                       <h2 class="white--text mb-3">My Spot</h2>
                                       <div>20th July 2019</div>
                                   </div>
                               </v-card-tittle>
                               <v-card-action >
                                   <v-btn  to="/spots/1">
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

<style>
    .title{
        padding-left: 20px;
    }
</style>