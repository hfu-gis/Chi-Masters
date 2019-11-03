<template>
    <div id="NavigationBar" role="navigation">
        <div id="logo" role="img">
            <router-link to="/views/home"><img alt="logo" src="../assets/logo.png"></router-link>
        </div>
        <div id="headline">
            <h1>{{headline}}</h1>
        </div>
        <div id="navigation">
            <router-link to="/views/login" v-if="!loggedIn">{{login}}</router-link>
            <router-link to="/" v-if="loggedIn">{{logoutText}}</router-link>
            <span v-if="loggedIn">{{username}}</span>
        </div>
    </div>
</template>

<script>
    import App from '../App.vue';

    export default {
        name: "Navbar",
        data: function() {
            return {
                headline: 'Chi-Masters',
                login: 'Einloggen oder Registrieren',
                logoutText: 'Ausloggen',
                loggedIn: App.data().loggedIn,
                username: App.data().username
            }
        }
    }
</script>

<style scoped>
    #navigation {
        margin-right: 5rem;
    }
    #NavigationBar {
        height: 10vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        left: 0;
        top: 0;
        width: 100%;
        box-shadow: 0 0.5vh 1vh grey;
    }
</style>