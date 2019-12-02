<template>
    <div>
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
                <div class="display-1 mb-2">Next meeting</div>
                <div class="title font-weight-regular grey--text">01.12.2019, Sunday, 14:30</div>
            </v-card-title>

            <v-divider class="mt-0"></v-divider>

            <v-card-text>
                <v-chip
                        class="mr-2"
                        @click="lights"
                >
                    <v-icon left>mdi-calendar-check</v-icon>
                    Set in calendar
                </v-chip>
                <v-chip
                        class="mr-2"
                        @click="alarm"
                >
                    <v-icon
                            color="green"
                            left>mdi-check-circle</v-icon>
                    Accept

                </v-chip>
                <v-chip @click="blinds">
                    <v-icon
                            color="red"
                            left>mdi-close-circle</v-icon>
                    Decline
                </v-chip>
            </v-card-text>
        </v-card>
        <v-card
                class="mx-auto"
                max-width="450"
                outlined
        >
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4">MONEY $</div>
                    <v-list-item-title class="headline mb-1">Open amounts</v-list-item-title>
                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                        tile
                        size="80"
                        color="grey"
                ></v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
                <v-btn text>Button</v-btn>
                <v-btn text>Button</v-btn>
            </v-card-actions>
        </v-card>
    </div>


</template>


<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>