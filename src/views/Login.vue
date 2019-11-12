<template>
    <div id="Login-Screen" role="main">
        <h1>{{msg}}</h1>
        <input v-if="!signIn && !signUp" id="email" type="email" :placeholder="mailText" v-model="email">
        <input v-if="signIn || signUp" id="password" type="password" :placeholder="pwText" v-model="password">
        <button id="submit" @click="check">{{submit}}</button>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: "Login",
        data: function () {
            return {
                msg: 'Login to your account or create a new one',
                mailText: 'Please type in your email',
                pwText: 'Please type in your password',
                submit: 'Login',
                email: '',
                password: '',
                signUp: false,
                signIn: false
            }
        },
        methods: {
            check: function() {
                let self = this;

                if(!self.signIn && !self.signUp){
                    firebase.auth().fetchSignInMethodsForEmail(this.email).catch((err) => {
                        alert(err.message);
                    }).then(function(result) {
                        if(result.length < 1){
                            self.signUp = true;
                            self.msg = 'Create a new Account';
                        }else {
                            self.msg = 'Login to your Account';
                            self.signIn = true;
                        }
                    });
                }else if(self.signUp){
                    self.create();
                }else if(self.signIn){
                    self.login();
                }else {
                    alert('Es gab einen Fehler beim Einloggen');
                }

            },
            create: function() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                    function() {
                        firebase.auth().currentUser.sendEmailVerification().then(function() {
                            //Email gesendet
                        }).catch(function(err) {
                            alert(err);
                        })
                    },
                    function(err) {
                        alert('war wohl nichts... ' + err);
                    }
                )
            },
            login: function() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    function(user) {
                        alert('Yeeahh ' + user);
                    },
                    function(err) {
                        alert('war wohl nichts... ' + err);
                    }
                )
            }
        }
    }
</script>

<style scoped>
    #Login-Screen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80vh;
    }
</style>