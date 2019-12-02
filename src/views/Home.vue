<template>
    <v-card
            class="mx-auto"
            max-width="450"
    >
        <v-img
                src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                :aspect-ratio="16/9"
        >

        </v-img>
        <v-card-title>
            <div class="display-1 mb-2">Nächster Termin</div>
            <div class="title font-weight-regular grey--text">01.12.2019, Sunday, 14:30</div>
        </v-card-title>

        <v-divider class="mt-0"></v-divider>

        <v-card-text>
            <v-chip
                    class="mr-2"
                    @click="lights"
            >
                <v-icon left>mdi-alarm-check</v-icon>
                Set alarm
            </v-chip>
            <v-chip
                    class="mr-2"
                    @click="alarm"
            >
                <v-icon left>mdi-alarm-check</v-icon>
                Accept
            </v-chip>
            <v-chip @click="blinds">
                <v-icon left>mdi-blinds</v-icon>
                Decline
            </v-chip>
        </v-card-text>
    </v-card>
</template>


<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>