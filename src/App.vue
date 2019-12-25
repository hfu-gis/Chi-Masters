<template>
  <v-app>
    <AppBar :user="user" :role="role" :firstName="firstName" :lastName="lastName" :organization="organization"/>
    <v-content class="mx-6 my-6">
      <router-view @login="login" @logout="logout" :user="user" :loggedIn="loggedIn"/>
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
      organization: null
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
      }
    },
    mounted() {
      this.automatedLogin();
    }
  };
</script>
