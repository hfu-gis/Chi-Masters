<template>
    <v-content>
        <v-layout text-center wrap>
            <v-flex xs12>
                <h1 class="display-2 font-weight-bold mb-3">
                    Create a new Orgorg Account
                </h1>
                <p class="subheading font-weight-regular">
                    Create here your new Orgorg.org Account. If you already got one,
                    <br>please
                    <router-link to="login">login here</router-link>
                </p>
            </v-flex>
            <v-flex>
                <v-form v-model="valid">
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-text-field label="Name of Orginization" v-model="name" :rules="nameRules"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-text-field label="Your first name" v-model="firstName" :rules="nameRules"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-text-field label="Your last name" v-model="lastName" :rules="nameRules"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-text-field label="E-mail" v-model="email" :rules="emailRules"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-text-field type="password" label="Password" v-model="password" :rules="passwordRules"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-btn :disabled="!valid" class="primary" @click="register">
                                    Create Account
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-flex>
                </v-form>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: "Register",
        data: () => ({
            valid: false,
            name: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            nameRules: [
                v => !!v || 'Is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            passwordRules: [
                v => !!v || 'Password is Required',
                v => (v && v.length >= 8) || 'Password must contain at least 8 Characters'
            ]
        }),
        methods: {
            register: function() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function() {
                    // TO-Do : Weiterleitung
                }).catch(function(error) {
                    //To-DO : Fehlerbehandlung
                    alert(error.message());
                })
            }
        }
    }
</script>

<style scoped>
</style>