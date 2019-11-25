<template>
    <v-content>
        <v-layout text-center wrap>
            <v-flex xs12>
                <h1 class="display-2 font-weight-bold mb-3">
                    Login in to your Orgorg Account
                </h1>
                <p class="subheading font-weight-regular">
                    Login via Google or with your email and password,
                    <br>if you need to create a Account
                    <router-link to="register">register here</router-link>
                </p>
            </v-flex>
            <v-flex>
                <v-form v-model="valid">
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
                                <v-text-field @input="resetError" :error-messages="errorMessages" type="password" label="Password" v-model="password" :rules="passwordRules"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-flex xs12>
                        <v-row justify="center">
                            <v-col cols="10" sm="8" md="4">
                                <v-btn :disabled="!valid" class="primary" @click="login">
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
            email: 'test@test.de',
            password: 'lolpoplol',
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
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch((err) => {
                    this.errorMessages = err.message;
                }).then((res) => {
                    this.$emit('login', res.user);
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