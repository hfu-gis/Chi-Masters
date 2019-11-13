<template>
    <div id="NavigationBar" role="navigation">
        <div id="logo" role="img">
            <router-link to="/views/home"><img alt="logo" src="../assets/logo.png"></router-link>
        </div>
        <div id="headline">
            <h1>{{headline}}</h1>
        </div>
        <div id="navigation">
            <router-link to="home">{{homeText}}</router-link>
            <router-link to="login" v-if="!loggedIn">{{loginText}}</router-link>
            <router-link to="imprint">Imprint</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data: function() {
            return {
                headline: 'Chi-Masters',
                loginText: 'Login or register',
                logoutText: 'Ausloggen',
                homeText: 'Home',
                loggedIn: false
            }
        }
    }
</script>

<style scoped>
    #navigation {
    }
    #NavigationBar {
        height: 10vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
        left: 0;
        top: 0;
        width: 100%;
        box-shadow: 0 0.5vh 1vh grey;
    }
</style>