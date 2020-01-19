<template>
    <v-content>
        <v-layout text-center wrap>
            <v-flex xs12>
                <h1 style="color: #fff" class="display-2 font-weight-bold mb-3">
                    Login in to your Orgorg Account
                </h1>
                <p style="color: #fff" class="subheading font-weight-regular">
                    Login via Google or with your email and password,
                    <br>if you need to create a Account
                    <router-link to="register" style="color: #ff9600">register here</router-link>
                </p>
            </v-flex>
            <v-flex>
                <v-form v-model="valid">
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-text-field dark color="#ff9600" class="textFieldClass" label="E-mail" v-model="email" :rules="emailRules"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-text-field dark color="#ff9600" @input="resetError" :error-messages="errorMessages" type="password" label="Password" v-model="password" :rules="passwordRules"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-checkbox dark color="#ff9600"
                                        v-model="checkbox"
                                        label="Automatisch einloggen"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-btn color="#ff9600" :disabled="!valid" @click="login">
                                    Login
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
        name: "Login",
        data: () => ({
            valid: false,
            email: '',
            password: '',
            checkbox: false,
            errorMessages: null,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is Required'
            ]
        }),
        methods: {
            login: function(){
                let self = this;
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch((err) => {
                    this.errorMessages = err.message;
                }).then((res) => {

                    window.localStorage.setItem('stayLoggedIn', self.checkbox);
                    if(window.localStorage.getItem('stayLoggedIn')){
                        window.localStorage.setItem('userEmail', self.email);
                        window.localStorage.setItem('userPassword', self.password);
                    }
                    this.$emit('login', res.user);
                    this.$router.push('home');
                })
            },
            resetError: function() {
                this.errorMessages = null;
            }
        }
    }
</script>

<style scoped>

</style>