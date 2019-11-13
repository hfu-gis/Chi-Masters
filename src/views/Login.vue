<template>
    <div id="Login-Screen" role="main">
        <div v-if="!getsRedirected" id="loginContent">
            <h1>{{msg}}</h1>
            <md-field md-clearable v-if="!signIn && !signUp" class="input">
                <md-icon><i class="fas fa-at"></i></md-icon>
                <label>E-Mail</label>
                <md-input v-model="email" type="email" @keypress.enter="check"></md-input>
            </md-field>
            <md-field v-if="(signIn || signUp) && !loggedIn" :class="messageClass" class="hinput">
                <md-icon><i class="fas fa-lock"></i></md-icon>
                <label>Password</label>
                <md-input v-model="password" type="password" @keypress.enter="check"></md-input>
                <span class="md-error">{{errorMessage}}</span>
            </md-field>
            <i v-if="loggedIn" class="fas fa-check big"></i>
            <div v-if="!loggedIn">
                <md-button v-if="signIn || signUp" @click="back" class="md-accent md-just-icon md-round submitButton"><i class="fas fa-arrow-left"></i></md-button>
                <md-button @click="check" class="md-accent md-just-icon md-round submitButton"><i class="fas fa-arrow-right"></i></md-button>
            </div>
        </div>
        <md-card v-if="getsRedirected">
            <md-card-header>
                <div class="md-title">Your verification Email successfully has been send <i class="fas fa-check"></i></div>
            </md-card-header>

            <md-card-content>
                If you dont get redirected automatically click on the Home button
            </md-card-content>
            <md-progress-bar class="md-accent" md-mode="buffer" :md-value="amount"></md-progress-bar>
            <md-card-actions>
                <md-button><router-link to="home">Home</router-link></md-button>
            </md-card-actions>
        </md-card>
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
                errorMessage: 'Error',
                getsRedirected: false,
                amount: 0,
                timer: null,
                loggedIn: false
            }
        },
        methods: {
            startTimer(time, to) {
                this.timer = setInterval(() => {
                    if(this.amount < time){
                        this.amount++;
                    }else {
                        clearInterval(this.timer);
                        this.amount = 0;
                        this.$router.push(to);
                    }
                }, 100);
            },
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
                            self.getsRedirected = true;
                            self.startTimer(100, 'home');
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
                        if(firebase.auth().currentUser.emailVerified){
                            self.loggedIn = true;
                            self.startTimer(20, 'game');
                        }else {
                            self.errorMessage = 'Seems like you haven\'t verify your email yet. Please verify your email and try again';
                            self.hasMessages = true;
                        }
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
    .big {
        width: 10vh;
        height: 10vh;
        font-size: 5em;
    }
    .submitButton {
        font-size: 3em;
        height: 5rem;
    }
    .input {
        width: 30vw;
    }
    .fa-check {
        color: green !important;
    }
    #Login-Screen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80vh;
    }
</style>