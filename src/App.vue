<template>
  <v-app>
    <AppBar @logout="logout" @changeOverlay="overlay = !overlay" :user="user" :role="role" :firstName="firstName" :lastName="lastName" :organization="organization"/>
    <v-content class="mx-6 my-6">
      <router-view @login="login"  :user="user" :loggedIn="loggedIn"/>
      <v-overlay :value="overlay">
        <v-card class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Add Member</div>
              <v-text-field label="E-mail" v-model="newEmail" :rules="emailRules"></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-btn text class="primary" @click="sendInvite">Invite</v-btn>
            <v-btn text class="error" @click="overlay = false">cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-overlay>
    </v-content>
  </v-app>
</template>

<script>
  import AppBar from "./components/AppBar";
  import firebase from 'firebase';
  import {db} from "./main";

  var firebaseConfig = {
    apiKey: "AIzaSyBsCwWH4NHk9PXo1Tlwnynad5-jOZlL-lw",
    authDomain: "orgorg-b30a0.firebaseapp.com",
    databaseURL: "https://orgorg-b30a0.firebaseio.com",
    projectId: "orgorg-b30a0",
    storageBucket: "orgorg-b30a0.appspot.com",
    messagingSenderId: "931741218373",
    appId: "1:931741218373:web:3e5fd926cfb4f1d327952c",
    measurementId: "G-7YMN6QDWV2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default {
    name: 'App',

    components: {
      AppBar,
    },

    data: () => ({
      user: null,
      loggedIn: false,
      role: null,
      firstName: null,
      lastName: null,
      organization: null,
      overlay: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      newEmail: null
    }),
    methods: {
      login(user) {
        this.user = user;
        this.loggedIn = true;
        db.collection('Users').doc(user.email).get().then((ref) => {
          this.role = ref.data().Role;
          this.firstName = ref.data().FirstName;
          this.lastName = ref.data().LastName;
          this.organization = ref.data().Organization[0];
        })
      },
      logout() {
        firebase.auth().signOut().then(() => {
          this.user = null;
          this.loggedIn = false;
        })
        window.localStorage.setItem('stayLoggedIn', false);
        window.localStorage.setItem('userEmail', '');
        window.localStorage.setItem('userPassword', '');
      },
      automatedLogin() {
        let self = this;
        if(window.localStorage.getItem('stayLoggedIn')){
          let email = window.localStorage.getItem('userEmail');
          let password = window.localStorage.getItem('userPassword');

          firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
            this.errorMessages = err.message;
          }).then((res) => {
            self.login(res.user);
          })
        }
      },
      sendInvite() {
        this.overlay = !this.overlay
      }
    },
    mounted() {
      this.automatedLogin();
    }
  };
</script>
