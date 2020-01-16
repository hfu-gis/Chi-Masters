<template>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            <v-img alt="OrgOrg Logo" class="shrink mr-2" contain src="../assets/org.svg" transition="scale-transition" width="120"/>
            <h1 v-if="loggedIn">{{organization}}</h1>
            <h1 v-if="!loggedIn">OrgOrg</h1>
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
                <v-list-item @click="navigateTo('profile')">
                    <v-icon class="mr-2 black--text" color="#000">mdi-account-circle</v-icon>
                    <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeOverlay">
                    <v-icon class="mr-2 black--text">mdi-account-multiple-plus</v-icon>
                    <v-list-item-title>Add member</v-list-item-title>
                </v-list-item>
                <v-list-item @click="navigateTo('memberList')">
                    <v-icon class="mr-2 black--text">mdi-account-group</v-icon>
                    <v-list-item-title>Member List</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                    <v-icon class="mr-2 black--text">mdi-logout</v-icon>
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
            navigateTo(destiny) {
                this.$router.push(destiny);
            },
            changeOverlay() {
                this.$emit('changeOverlay');
            }
        },
    }
</script>

<style scoped>

</style>