<template>
    <div>
        <h1>Settings</h1>
        <router-link to="profile" tag="v-btn">
            <v-btn class="mr-2">
                <span class="mr-2">Profile</span>
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>
        </router-link>
        <v-btn @click="logout">
            <span class="mr-2">Logout</span>
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "Settings",
        methods: {
            logout() {
                this.$emit('logout');
                this.$router.push('home');
            }
        }
    }
</script>

<style scoped>

</style>