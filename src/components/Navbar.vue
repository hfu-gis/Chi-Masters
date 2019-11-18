<template>
    <md-toolbar id="NavigationBar">
        <router-link to="home"><h3 class="md-title">Chi-Masters</h3></router-link>
        <div id="navigation">
            <router-link to="home"><md-button class="md-raised md-accent spacing">Home</md-button></router-link>
            <router-link to="login"><md-button class="md-raised md-accent spacing">Login / Register</md-button></router-link>
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
        position: fixed;
        background-color: transparent;
        box-shadow: none !important;
    }
    .spacing{
        margin-right: 0.7em !important;
        margin-top: 2em !important;
    }
</style>