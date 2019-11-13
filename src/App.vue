<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDuow2tAw4-31QulqXoVZTmKe91_mvV1-Y",
  authDomain: "chi-masters.firebaseapp.com",
  databaseURL: "https://chi-masters.firebaseio.com",
  projectId: "chi-masters",
  storageBucket: "chi-masters.appspot.com",
  messagingSenderId: "982609856511",
  appId: "1:982609856511:web:dd65da53afb408ae0109ca",
  measurementId: "G-RGKHBV56CN"
};

firebase.initializeApp(firebaseConfig);

export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  },
  methods: {
  }
}
</script>

<style>
  *{
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
