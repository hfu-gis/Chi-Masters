<template>
    <v-content>
        <v-row justify="center" class="mt-lg-n12">
            <v-col cols="8">
                <v-card class="justify-center transparent" elevation="0">
                    <v-row justify="center" class="mb-12">
                        <v-card-title style="font-size: 2.3em; color: #fff">Your profile</v-card-title>
                    </v-row>
                    <v-row justify="center">
                        <v-avatar color="orange" size="10em">
                            <span class="white--text headline" style="font-size: 4em !important;">{{getAvatarLetters()}}</span>
                        </v-avatar>
                    </v-row>
                    <v-row cols="12" justify="center" class="mt-8">
                        <v-col cols="5">
                            <v-text-field dark v-model="firstNameNew" tex type="text" label="first name" :placeholder="firstName" @input="changeFirstName"></v-text-field>
                        </v-col>
                        <v-col cols="5">
                            <v-text-field dark v-model="lastNameNew" type="text" label="last name" :placeholder="lastName" @input="changeLastName"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="10">
                            <v-text-field dark disabled type="text" :label="user.email"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center" class="mb-12">
                        <v-col cols="12">
                            <v-card class="transparent" elevation="0">
                                <v-row justify="center">
                                    <v-card-title style="color: #fff">Change Password</v-card-title>
                                </v-row>
                                <v-row justify="center">
                                    <v-col cols="10">
                                        <v-text-field dark :error-messages="error" v-model="firstPW" type="password" label="password" @input="checkPW"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row justify="center">
                                    <v-col cols="10">
                                        <v-text-field dark :error-messages="error" v-model="secondPW" :value="validat" type="password" label="password" @input="checkPW"></v-text-field>
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
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
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
    .background-overlay {
        background-color: rgba(0, 0, 0, 0.3) !important;
    }
    .error{
        background-color: transparent !important;
        color: red;
    }
</style>