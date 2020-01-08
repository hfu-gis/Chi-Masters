<template>
    <v-content>
        <v-row justify="center">
            <v-card class="justify-center" max-width="80%"  min-width="50%" elevation="5">
                <v-row justify="center" class="mb-12">
                    <v-card-title style="font-size: 2.3em">Your profile</v-card-title>
                </v-row>
                <v-row justify="center">
                    <v-avatar color="orange" size="10em">
                        <span class="white--text headline" style="font-size: 4em !important;">{{getAvatarLetters()}}</span>
                    </v-avatar>
                </v-row>
                <v-row cols="12" justify="center" class="mt-8">
                    <v-col cols="5">
                        <v-text-field v-model="firstNameNew" tex type="text" label="first name" :placeholder="firstName" @input="changeFirstName"></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-text-field v-model="lastNameNew" type="text" label="last name" :placeholder="lastName" @input="changeLastName"></v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="10">
                        <v-text-field disabled type="text" :label="user.email"></v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="center" class="mb-12">
                    <v-card max-width="90%" min-width="80%">
                        <v-row justify="center">
                            <v-card-title>Change Password</v-card-title>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="10">
                                <v-text-field :error-messages="error" v-model="firstPW" type="password" label="password" @input="checkPW"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="10">
                                <v-text-field :error-messages="error" v-model="secondPW" :value="validat" type="password" label="password" @input="checkPW"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="center" class="mb-5">
                            <v-btn class="primary" :disabled="!validat" @click="changePW">Change</v-btn>
                        </v-row>
                        <v-row justify="center" class="mb-5" v-if="success">
                            <v-icon size="3em" color="green">mdi-check-circle</v-icon>
                        </v-row>
                        <v-row v-if="showMessage" justify="center" class="mb-3">
                            <v-col cols="5" class="error">
                                <span>{{pwMessage}}</span>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-row>
            </v-card>
        </v-row>
    </v-content>
</template>

<script>
    import {db} from '../main';
    import firebase from 'firebase';

    export default {

        name: "Profile",
        props: {
            user: Object,
            firstName: String,
            lastName: String,
            role: String,
            organization: String
        },
        data: () => {
            return {
                firstPW: "",
                secondPW: "",
                error: null,
                validat: false,
                firstNameNew: "",
                lastNameNew: "",
                pwMessage: "",
                showMessage: false,
                success: false
            }
        },
        methods: {
            getAvatarLetters() {
                return this.firstName.charAt(0) + this.lastName.charAt(0);
            },
            checkPW() {
                if(this.firstPW !== this.secondPW){
                    this.error = "Password has to be the same";
                    this.validat = false;
                    return false;
                }
                if(this.firstPW.length < 8) {
                    this.error = "password has to bet at least 8 characters";
                    return false;
                }
                this.error = null;
                this.validat = true;
                return true;
            },
            changeFirstName() {
                let self = this;
                db.collection('Users').doc(self.user.email).update({"FirstName": self.firstNameNew});
                self.$emit('updateUserData');
            },
            changeLastName() {
                let self = this;
                db.collection('Users').doc(self.user.email).update({"LastName": self.lastNameNew});
                self.$emit('updateUserData');
            },
            changePW() {
                let self = this;
                firebase.auth().currentUser.updatePassword(self.firstPW).then(() => {
                    this.success = true;
                }).catch((err) => {
                    self.showMessage = true;
                    self.pwMessage = "Sorry there was an error by updating your password: " + err.message;
                })
            }
        },
        computed: {
        }
    }
</script>

<style scoped>
    .error{
        background-color: transparent !important;
        color: red;
    }
</style>