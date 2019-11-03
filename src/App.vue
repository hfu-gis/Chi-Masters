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

let user = {
  loggedIn: false,
  username: 'Dennis',
  token: '1235',
  gameCharacter: 'test'
};

export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  },
  data: function() {
    return user;
  },
  methods: {
    logout: function() {
      user.loggedIn = false;
    }
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
