<template>
    <v-container>
        <v-layout justify-space-around>
            <v-flex xs12 sm6 offset-3>
                <v-card-text>
                    <v-container>
                        <form @submit.prevent="onSinup">
                            <v-layout row justify-space-around>
                                <v-flex xs12>
                                    <v-text-field
                                            name="email"
                                            label="Mail"
                                            id="email"
                                            v-model="email"
                                            type="email"
                                            required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                            name="password"
                                            label="Password"
                                            id="password"
                                            v-model="password"
                                            type="password"
                                            required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                            name="confirmpassword"
                                            label="Confirm Password"
                                            id="confirmpassword"
                                            v-model="confirmpassword"
                                            type="password"
                                            :rules="[comparePasswords]"></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn type="submit">Sign Up </v-btn>
                                </v-flex>
                            </v-layout>

                        </form>
                    </v-container>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data(){
            return {
                email: '',
                password:'',
                confirmpassword:''

            }
        },
        computed: {
            comparePasswords (){
                return this.password !== this.confirmpassword ? 'Password do not match': ''
            },
            user (){
                return this.$store.getters.user
            }
        },
        watch :{
            user (value){
                if (value !== null && value !== undefined){
                    this.$router.push('/')
                }
            }
        },
        methods:{
            onSinup(){
                    this.$store.dispatch('signUp' ,{email: this.email, password: this.password})

            }
        }
    }
</script>