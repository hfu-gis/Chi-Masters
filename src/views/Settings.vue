<template>
    <div>
        <h1>Settings</h1>
        <router-link to="profile" tag="v-btn">
            <v-btn class="mr-2">
                <span class="mr-2">Profile</span>
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>
        </router-link>
        <router-link to="login" tag="v-btn">
            <v-btn>
                <span class="mr-2">Logout</span>
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Settings"
    }
</script>

<style scoped>

</style>