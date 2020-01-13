<template>
    <div>
        <div v-if="!user" id="informationHome">
            <div id="app">
                <v-app light>
                    <v-content>
                        <section>
                            <v-content style="margin-top: -8em">
                                <v-layout column align-center justify-center class="black--text">
                                    <img src="../assets/org_new.svg" alt="logo.png" height="300" class="mb-8">
                                    <h1 class="black--text mb-2 display-1 text-center">Welcome to OrgOrg</h1>
                                </v-layout>
                            </v-content>

                        </section>
                        <v-layout
                                column
                                wrap
                                class="my-12"
                                align-center
                        >
                            <v-flex xs12 sm4 class="">
                                <div class="text-center">
                                    <h2 class="headline">The best way to organize your organization</h2>
                                    <span class="subheading"> Join with your club </span>
                                </div>
                            </v-flex>
                            <v-flex xs12>
                                <v-container grid-list-xl>
                                    <v-layout row wrap align-center>
                                        <v-flex xs12 md4>
                                            <v-card flat class="transparent">
                                                <v-card-text class="text-center">
                                                    <v-icon x-large class="blue--text text--lighten-2">mdi-newspaper-variant-multiple-outline</v-icon>
                                                </v-card-text>
                                                <v-card-title primary-title class="layout justify-center">
                                                    <div class="headline text-center">News</div>
                                                </v-card-title>
                                                <v-card-text>
                                                    You always stay up to date with our survey function.
                                                    With OrgOrg you can easily take part of the survey from everywhere.

                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <v-flex xs12 md4>
                                            <v-card flat class="transparent">
                                                <v-card-text class="text-center">
                                                    <v-icon x-large class="blue--text text--lighten-2">mdi-cash-multiple</v-icon>
                                                </v-card-text>
                                                <v-card-title primary-title class="layout justify-center">
                                                    <div class="headline">Outstanding Balance</div>
                                                </v-card-title>
                                                <v-card-text>
                                                    You still have to pay to the cash register and you forgot it?
                                                    OrgOrg reminds you of this.
                                                    Your outstanding balance will be reset after the payment.
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <v-flex xs12 md4>
                                            <v-card flat class="transparent">
                                                <v-card-text class="text-center">
                                                    <v-icon x-large class="blue--text text--lighten-2">mdi-calendar-multiple</v-icon>
                                                </v-card-text>
                                                <v-card-title primary-title class="layout justify-center">
                                                    <div class="headline text-center">Next Meeting</div>
                                                </v-card-title>
                                                <v-card-text>
                                                    Always see the next dates and with OrgOrg you can accept or decline this Meeting.
                                                    You also can set this in your phone calendar.
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-flex>
                            <router-link to="register" tag="v-btn" >
                                <v-btn
                                        class="mt-12"
                                        color="primary"
                                        dark
                                        large
                                >
                                    Get Started
                                </v-btn>
                            </router-link>
                        </v-layout>
                        <section>

                        </section>
                    </v-content>
                </v-app>
            </div>
            </div>
        <div v-if="user" id="loggedInHome">
            <v-card
                    class="mx-auto mb-6"
                    max-width="450"

            >
                <v-card-actions>
                    <v-container fluid>
                        <v-list-item-title class="headline mb-3">Survey</v-list-item-title>
                        <v-list-item-subtitle>Should we buy a new equipment? </v-list-item-subtitle>
                        <v-row align="center">
                            <v-col class="my-0" cols="12" sm="6">

                                <v-select
                                        :items="items"
                                        label="Decide"
                                        dense
                                        solo
                                ></v-select>
                                <v-btn class="mr-2">
                                    <span class="mr-2">Send</span>
                                </v-btn>
                            </v-col>
                        </v-row>

                    </v-container>

                </v-card-actions>
            </v-card>

            <v-card
                    class="mx-auto mb-6"
                    max-width="450"

            >
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-2">MONEY $</div>
                        <v-list-item-title class="headline mb-3">Open amounts</v-list-item-title>
                        <v-list-item-subtitle>Outstanding balance: 25$</v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>

                <v-card-actions>
                    <router-link to="money" tag="v-btn">
                        <v-btn class="ml-2 mb-2">
                            <span class="mr-2">Money</span>
                        </v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>

            <v-card
                    class="mx-auto mb-12"

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
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            user: Object
        },
        data: () => ({
            items: ['Yes', 'No'],
        }),
    }
</script>

<style scoped>

</style>