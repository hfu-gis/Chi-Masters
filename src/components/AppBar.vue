<template>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/>
            <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100"/>
        </div>

        <v-spacer></v-spacer>

        <router-link to="home" tag="v-btn">
            <v-btn class="mr-2">
                <span class="mr-2">Home</span>
                <v-icon>mdi-home</v-icon>
            </v-btn>
        </router-link>
        <router-link to="calendar" tag="v-btn">
            <v-btn class="mr-2">
                <span class="mr-2">Calendar</span>
                <v-icon>mdi-home</v-icon>
            </v-btn>
        </router-link>
        <router-link to="money" tag="v-btn">
            <v-btn class="mr-2">
                <span class="mr-2">Money</span>
                <v-icon>mdi-currency-usd</v-icon>
            </v-btn>
        </router-link>
        <router-link to="settings" tag="v-btn">
            <v-btn class="mr-2">
                <span class="mr-2">Settings</span>
                <v-icon>mdi-home</v-icon>
            </v-btn>
        </router-link>
        <router-link to="register" tag="v-btn">
            <v-btn class="mr-2">
                <span class="mr-2">Register</span>
                <v-icon>mdi-account-plus</v-icon>
            </v-btn>
        </router-link>
        <router-link to="login" tag="v-btn">
            <v-btn class="mr-2" :to="login">
                <span class="mr-2">Login</span>
                <v-icon>mdi-login</v-icon>
            </v-btn>
        </router-link>
        <router-link to="login" tag="v-btn">
            <v-btn>
                <span class="mr-2">Logout</span>
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </router-link>
    </v-app-bar>
</template>

<script>

    export default {
        name: "AppBar",
        props: {
            user: Object,
        },
        methods: {
            logout() {
                this.$emit('logout');
            }
        }
    }
</script>

<style scoped>

</style>