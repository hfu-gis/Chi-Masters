<template>
    <md-toolbar id="NavigationBar" md-elevation="4">
        <router-link to="home"><h3 class="md-title">Chi-Masters</h3></router-link>
        <div id="navigation">
            <router-link to="home"><md-button>Home</md-button></router-link>
            <router-link to="login"><md-button>Login / Register</md-button></router-link>
        </div>
    </md-toolbar>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>
    #navigation {
        justify-content: flex-end;
    }
    #NavigationBar {
        display: flex;
        justify-content: space-between;
    }
</style>