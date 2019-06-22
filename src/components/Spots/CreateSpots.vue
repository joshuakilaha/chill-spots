<template>
    <v-container>
        <v-layout row justify-space-around>
            <v-flex xs12 sm6 offset-sm-2>
                <h1>Create a Spot</h1>
            </v-flex>
        </v-layout>
        <v-layout row >
            <v-flex xs12 sm6 offset-sm2>
                <form @submit.prevent="onCreatespot">
                    <v-layout row justify-space-around>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                    name="title"
                                    label="Title"
                                    id="title"
                                    v-model="title"
                                    required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>


                    <v-layout row justify-space-around>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                    name="location"
                                    label="Location"
                                    id="location"
                                    v-model="location"
                                    required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row justify-space-around>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                            <input
                                    type="file"
                                    style="display: none"
                                    ref="fileInput"
                                    accept="image/*"
                                    @change="onFilePicked">
                        </v-flex>
                    </v-layout>

                    <v-layout row justify-space-around>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="150">
                        </v-flex>
                    </v-layout>


                    <v-layout row justify-space-around>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                    name="description"
                                    label="Description"
                                    id="description"
                                    multi-line
                                    v-model="description"
                                    required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row justify-space-around>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-date-picker  v-model="date" class="mb-3"></v-date-picker>
                        </v-flex>
                    </v-layout>

                    <v-layout row justify-space-around>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-time-picker v-model="time" format="24hr"></v-time-picker>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn
                                    class="primary"
                                    :disabled="!formisValid"
                                    type="submit">
                                Create Spot</v-btn>
                            {{SubmiteDateTime}}
                        </v-flex>
                    </v-layout>

                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    export default{
        data(){
            return{
                title: '',
                location:'',
                imageUrl:'',
                description:'',
                date: new Date().toISOString().substr(0, 10),
                time: new Date(),
                image: null
            }
        },
        computed: {
            formisValid(){
                return this.title !== '' &&
                    this.location !== '' &&
                    this.imageUrl !== '' &&
                    this.description !== ''

            },

            SubmiteDateTime(){
                const date = new Date(this.date)
                if(typeof this.time === 'string'){
                    let hours = this.time.match(/^(\d+)/)[1]
                    const minutes = this.time.match(/:(\d+)/)[1]
                    date.setHours(hours)
                    date.setMinutes(minutes)
                }else {
                    date.setHours(this.time.getHours())
                    date.setMinutes(this.time.getMinutes())
                }
                return date
            }
        },
        methods: {
            onCreatespot(){
                if(!this.formisValid){
                    return
                }
                if (!this.image){
                    return
                }
                const spotData = {
                    title: this.title,
                    location: this.location,
                    image: this.image,
                    description: this.description,
                    date: new Date()
                }
                this.$store.dispatch('createspot',spotData)
                this.$router.push('/spots')
            },

            inputHandler(date) {
                if (typeof date === 'string')
                this.isActive = false;
                this.theDate = date;
            },

            onPickFile(){
                    this.$refs.fileInput.click()
              },

            onFilePicked(event){
                const files = event.target.files
                let filename =files[0].name
                if (filename.lastIndexOf('.') <= 0){
                    return alert('Please add a valid file')
                }
                const fileReader = new FileReader()
                fileReader.addEventListener('load',() => {
                    this.imageUrl = fileReader.result
                })
                fileReader.readAsDataURL(files[0])
                this.image = files[0]

            },
        }
    }
</script>