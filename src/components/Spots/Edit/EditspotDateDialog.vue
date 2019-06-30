<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <v-btn  accent slot="activator">
            Edit Date
        </v-btn>
        <v-card>
            <v-container >
                <v-layout justify-space-around>
                    <v-flex xs12>
                        <v-card-title>Edit Your Date</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>

                <v-layout justify-space-around>
                    <v-flex xs12>
                        <v-date-picker v-model="editableDate" style="width: 100%" actions>
                            <template scope="">
                                <v-btn class="blue--text darken-1" flat @click.native="editDialog = false">Close</v-btn>
                                <v-btn class="blue--text darken-1" flat @click.native="onSaveChanges">Save</v-btn>
                            </template>
                        </v-date-picker>
                    </v-flex>

                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>



    export default {
        props: ['spot'],
        data(){
            return{
                editDialog: false,
                editableDate: null
            }
        },
        methods: {
            onSaveChanges (){
                const newDate = new Date(this.spot.date)
                const newDay = new Date(this.editableDate).getUTCDate()
                const newMonth = new Date(this.editableDate).getUTCMonth()
                const newYear = new Date(this.editableDate).getUTCFullYear()

                this.$store.dispatch('UpdateSpotData',{
                    id: this.spot.id,
                    date: new Date
                })
                newDate.setUTCDate(newDay)
                newMonth.setUTCMonth(newMonth)
                newYear.setUTCFullYear(newYear)

            }
        },
        created() {
            this.editableDate = new Date(this.spot.date).toISOString().substr(0, 10)

        }
    }
</script>