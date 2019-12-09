<template>
  <v-app>
    <AppBar :user="user"/>
    <v-content class="mx-6 my-6">
      <router-view @login="login" @logout="logout" :user="user"/>
    </v-content>
  </v-app>
</template>

<script>
  import AppBar from "./components/AppBar";
  import firebase from 'firebase';

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
      loggedIn: false
    }),
    methods: {
      login(user) {
        this.user = user;
        this.loggedIn = true;
      },
      logout() {
        firebase.auth().signOut().then(() => {
          this.user = null;
          this.loggedIn = false;
        })
      }
    }
  };
</script>
