<template>
    <div id="Login-Screen" role="main">
        <h1>{{msg}}</h1>
        <md-field md-clearable v-if="!signIn && !signUp" class="has-green input">
            <md-icon><i class="fas fa-at"></i></md-icon>
            <label>E-Mail</label>
            <md-input v-model="email" type="email"></md-input>
        </md-field>
        <md-field v-if="signIn || signUp" :class="messageClass" class="has-danger input">
            <md-icon><i class="fas fa-lock"></i></md-icon>
            <label>Password</label>
            <md-input v-model="password" type="password"></md-input>
            <span class="md-error">{{errorMessage}}</span>
        </md-field>
        <div>
            <md-button v-if="signIn || signUp" @click="back" class="md-accent md-just-icon md-round submitButton"><i class="fas fa-arrow-left"></i></md-button>
            <md-button @click="check" class="md-accent md-just-icon md-round submitButton"><i class="fas fa-arrow-right"></i></md-button>
        </div>

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
                signIn: false,
                hasMessages: false,
                errorMessage: 'Error'
            }
        },
        methods: {
            back: function() {
                this.signUp = false;
                this.signIn = false;
                this.msg = 'Login to your account or create a new one';
            },
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
                let self = this;

                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                    function() {
                        firebase.auth().currentUser.sendEmailVerification().then(function() {
                            //Email gesendet
                        }).catch(function(err) {
                            self.errorMessage = err.message;
                            self.hasMessages = true;
                        })
                    },
                    function(err) {
                        alert('war wohl nichts... ' + err);
                    }
                )
            },
            login: function() {
                let self = this;
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    function() {
                        // TO_DO : redirecting to home
                    },
                    function(err) {
                        self.errorMessage = err.message;
                        self.hasMessages = true;
                    }
                )
            }
        },
        computed: {
            messageClass () {
                return {
                    'md-invalid': this.hasMessages
                }
            }
        }
    }
</script>

<style scoped>
    h1 {
        height: 5rem;
    }
    .submitButton {
        font-size: 3em;
        height: 5rem;
    }
    .input {
        width: 30vw;
    }
    #Login-Screen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80vh;
    }
</style>