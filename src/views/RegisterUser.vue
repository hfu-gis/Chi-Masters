<template>
    <v-content>
        <v-layout text-center wrap v-if="tokenIsValid">
            <v-flex xs12>
                <h1 class="display-2 font-weight-bold mb-3">
                    Create a new Orgorg Account
                </h1>
                <p class="subheading font-weight-regular">
                    You were invited to join the <b>{{name}}</b> with the email: <b>{{email}}</b>
                </p>
            </v-flex>
            <v-flex>
                <v-form v-model="valid">
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
        <h2 v-if="!tokenIsValid">Loading</h2>
    </v-content>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import firebase from 'firebase';
    import {db} from '@/main';

    export default {
        name: "Register",
        data: () => ({
            valid: false,
            tokenIsValid: false,
            name: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            token: '',
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
                        Role: 'MEMBER',
                        money: []
                    });

                    db.collection('Organization').doc(self.name).get().then((res) => {
                        let users = res.data().Users;
                        users[users.length] = self.email;
                        db.collection('Organization').doc(self.name).update({"Users": users});
                    }).then(() => {
                        db.collection('Invites').doc(self.token).delete().then(() => {
                            self.$emit('login', res.user);
                            self.$router.push('home');
                        });
                    });
                }).catch(function(error) {
                    //To-DO : Fehlerbehandlung
                    alert(error.message);
                });
            },
            getUrlParameterByName(name, url)
            {
                if (!url) url = window.location.href;
                name = name.replace(/[[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            },
            checkTokenAndEmail() {
                db.collection('Invites').doc(this.token).get().then((res) => {
                    if(res.data()){
                        this.tokenIsValid = true;
                        this.email = res.data().email;
                        this.name = res.data().organization
                    }
                }).catch(() => {
                    //Fehlerbehandlung programmieren
                });
            }
        },
        mounted() {
            this.token = this.getUrlParameterByName("t", window.location);
            this.checkTokenAndEmail();
        }
    }
</script>

<style scoped>
</style>