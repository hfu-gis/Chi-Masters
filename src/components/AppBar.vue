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
        <router-link v-if="user" to="calendar" tag="v-btn">
            <v-btn class="mr-2">
                <span class="mr-2">Calendar</span>
                <v-icon>mdi-calendar-today</v-icon>
            </v-btn>
        </router-link>
        <router-link v-if="user" to="money" tag="v-btn">
            <v-btn class="mr-2">
                <span class="mr-2">Money</span>
                <v-icon>mdi-currency-usd</v-icon>
            </v-btn>
        </router-link>
        <v-menu offset-y v-if="user">
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" class="mr-2">
                    <span class="mr-2">Settings</span>
                    <v-icon>mdi-settings</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item @click="navigateToProfile">
                    <v-icon class="mr-2">mdi-account-circle</v-icon>
                    <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeOverlay">
                    <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>
                    <v-list-item-title>Add member</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                    <v-icon class="mr-2">mdi-logout</v-icon>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <router-link v-if="!user" to="register" tag="v-btn">
            <v-btn class="mr-2">
                <span class="mr-2">Register</span>
                <v-icon>mdi-account-plus</v-icon>
            </v-btn>
        </router-link>
        <router-link v-if="!user" to="login" tag="v-btn">
            <v-btn class="mr-2">
                <span class="mr-2">Login</span>
                <v-icon>mdi-login</v-icon>
            </v-btn>
        </router-link>
    </v-app-bar>
</template>

<script>
    export default {
        name: "AppBar",
        data: () => {
            return {
                overlay: false
            }
        },
        props: {
            user: Object,
            loggedIn: Boolean,
            role: String,
            firstName: String,
            lastName: String,
            organization: String
        },
        methods: {
            logout() {
                this.$emit('logout');
                this.$router.push('home');
            },
            navigateToProfile() {
                this.$router.push('profile');
            },
            changeOverlay() {
                this.$emit('changeOverlay');
            }
        },
    }
</script>

<style scoped>

</style>