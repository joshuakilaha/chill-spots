<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <v-btn fab accent slot="activator">
        <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container >
                <v-layout justify-space-around>
                    <v-flex xs12>
                         <v-card-title>Edit Your Spot</v-card-title>
                    </v-flex>
                </v-layout>
                <v-layout justify-space-around>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                    name="title"
                                    label="Title"
                                    id="title"
                                    v-model="editedTitle"
                                    required></v-text-field>
                            <v-textarea
                                name="description"
                                label="Description"
                                id="description"
                                outline=""
                                v-model="editedDescription"
                                required>
                            </v-textarea>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout justify-space-around>
                    <v-flex xs12>
                        <v-card-actions>
                        <v-btn flat class="primary--text darken-1" @click="editDialog = false">Close</v-btn>
                            <v-btn flat class="primary--text darken-1" @click="onSaveChanges">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['spot'],
        data (){
            return {
                 editDialog: false,
                editedTitle: this.spot.title,
                editedDescription: this.spot.description
            }
        },
        methods:{
            onSaveChanges() {
                if(this.editedTitle.trim() === '' || this.editedDescription.trim() === ''){
                    return
                }
                this.editDialog = false
                this.$store.dispatch('UpdateSpotData', {
                    id: this.spot.id,
                    title: this.spot.editedTitle,
                    description: this.spot.editedDescription
                })
            }
        }
    }
</script>
