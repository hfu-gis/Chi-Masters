<template>
    <v-content>
        <v-layout text-center wrap>
            <v-flex xs12>
                <h1 style="color: #fff" class="display-2 font-weight-bold mb-3 text-white">
                    Create a new Orgorg Account
                </h1>
                <p style="color: #fff" class="subheading font-weight-regular text-white">
                    Create here your new Orgorg.org Account. If you already got one,
                    <br>please
                    <router-link to="login" style="color: #ff9600">login here</router-link>
                </p>
            </v-flex>
            <v-flex>
                <v-form v-model="valid">
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-text-field dark color="#ff9600" label="Name of Orginization" v-model="name" :rules="nameRules"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-text-field dark color="#ff9600" label="Your first name" v-model="firstName" :rules="nameRules"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-text-field dark color="#ff9600" label="Your last name" v-model="lastName" :rules="nameRules"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-text-field dark color="#ff9600" label="E-mail" v-model="email" :rules="emailRules"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-text-field dark color="#ff9600" type="password" label="Password" v-model="password" :rules="passwordRules"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-btn color="#ff9600" :disabled="!valid" class="text-white" @click="register">
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
    import {db} from '@/main';

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
                v => !!v || 'Is required'
            ],
            passwordRules: [
                v => !!v || 'Password is Required',
                v => (v && v.length >= 8) || 'Password must contain at least 8 Characters'
            ]
        }),
        methods: {
            register: function() {
                let self = this;
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function(res) {
                    db.collection('Users').doc(self.email).set({
                        Organization: [self.name],
                        FirstName: self.firstName,
                        LastName: self.lastName,
                        Role: 'ADMIN',
                        money: []
                    });
                    db.collection('Organization').doc(self.name).set({
                        Users: [self.email]
                    }).then(() => {
                        self.$emit('login', res.user);
                        self.$router.push('home');
                    });
                }).catch(function(error) {
                    //To-DO : Fehlerbehandlung
                    alert(error.message);
                })
            }
        }
    }
</script>

<style scoped>
</style>

