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
                                    <h1 class="black--text mb-2 display-1 text-center primary-color">Welcome to OrgOrg</h1>
                                </v-layout>
                            </v-content>
                        </section>
                        <v-layout column wrap class="my-12" align-center>
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
                                                    <v-icon x-large class="blue--text text--lighten-2">mdi-notebook-multiple</v-icon>
                                                </v-card-text>
                                                <v-card-title primary-title class="layout justify-center">
                                                    <div class="headline text-center">What is OrgOrg?</div>
                                                </v-card-title>
                                                <v-card-text>
                                                    OrgOrg is an online planner for your club, association, organizations et cetera.
                                                    If a lot is written in your chat group and you miss out on many appointments because of this,
                                                    then is OrgOrg the best choise for you and your members.

                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <v-flex xs12 md4>
                                            <v-card flat class="transparent">
                                                <v-card-text class="text-center">
                                                    <v-icon x-large class="blue--text text--lighten-2">mdi-calendar-multiple</v-icon>
                                                </v-card-text>
                                                <v-card-title primary-title class="layout justify-center">
                                                    <div class="headline">Next Meeting</div>
                                                </v-card-title>
                                                <v-card-text>
                                                    Stay up to date with OrgOrg.
                                                    You always see the next dates in your calendar and don't miss this among the many chats of your chat group.
                                                    You can also accept or decline this Meeting and set this in your phone calendar.
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <v-flex xs12 md4>
                                            <v-card flat class="transparent">
                                                <v-card-text class="text-center">
                                                    <v-icon x-large class="blue--text text--lighten-2">mdi-cash-multiple</v-icon>
                                                </v-card-text>
                                                <v-card-title primary-title class="layout justify-center">
                                                    <div class="headline text-center">Outstanding Balance</div>
                                                </v-card-title>
                                                <v-card-text>
                                                    You still have to pay to the cash register and you forgot it?
                                                    OrgOrg reminds you of this.
                                                    Your outstanding balance will be reset after the payment.
                                                    If the organization owes you money, you can also register it.
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-flex>
                            <router-link to="register" tag="v-btn" >
                                <v-btn class="mt-12" color="primary" dark large>
                                    Get Started
                                </v-btn>
                            </router-link>
                        </v-layout>
                    </v-content>
                </v-app>
            </div>
            </div>
        <div v-if="user" id="loggedInHome">
            <v-row cols="12" justify="center">
                <v-col cols="6">
                    <v-card v-if="openToGetPayed != 0 || openToPay != 0">
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="overline mb-2 black--text">MONEY $</div>
                                <v-list-item-title class="headline mb-3 black--text">Open amounts</v-list-item-title>
                                <v-list-item-subtitle class="black--text">Outstanding balance to pay: {{openToPay}}$</v-list-item-subtitle>
                                <v-list-item-subtitle class="black--text">Outstanding balance to get payed: {{openToGetPayed}}$</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-card-actions>
                            <router-link to="money" tag="v-btn">
                                <v-btn class="ml-2 mb-2">
                                    <span class="mr-2 black--text">Money</span>
                                </v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-row cols="12" justify="center" v-if="ready">
                <v-col cols=3 v-if="eventsOpen.length > 0">
                <v-card class="mx-auto mb-12" min-height="35em"> <!--:color="event.color"-->
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg" :aspect-ratio="16/9"></v-img>
                    <v-card-title>
                        <div class="display-1 mb-2 black--text">{{eventsOpen[0].name}}</div>
                    </v-card-title>
                    <v-card-text>
                        <v-row cols="12">
                            <v-col cols="6">
                                <p class="black--text"><b>date:</b><br>{{eventsOpen[0].date}}</p>
                                <p class="black--text"><b>details:</b><br>{{eventsOpen[0].details}}</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-lg-space-around">
                        <v-chip @click="acceptEvent(0)">
                            <v-icon class="black--text" color="green" left>mdi-check-circle</v-icon>
                            Accept
                        </v-chip>
                        <v-chip @click="declineEvent(0)">
                            <v-icon class="black--text" color="red" left>mdi-close-circle</v-icon>
                            Decline
                        </v-chip>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols=3 v-if="eventsOpen.length > 1">
                <v-card class="mx-auto mb-12" min-height="35em"> <!--:color="event.color"-->
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg" :aspect-ratio="16/9"></v-img>
                    <v-card-title>
                        <div class="display-1 mb-2 black--text">{{eventsOpen[1].name}}</div>
                    </v-card-title>
                    <v-card-text>
                        <v-row cols="12">
                            <v-col cols="6">
                                <p class="black--text"><b>date:</b><br>{{eventsOpen[1].date}}</p>
                                <p class="black--text"><b>details:</b><br>{{eventsOpen[1].details}}</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-lg-space-around">
                        <v-chip @click="acceptEvent(1)">
                            <v-icon class="black--text" color="green" left>mdi-check-circle</v-icon>
                            Accept
                        </v-chip>
                        <v-chip @click="declineEvent(1)">
                            <v-icon class="black--text" color="red" left>mdi-close-circle</v-icon>
                            Decline
                        </v-chip>
                    </v-card-actions>
                </v-card>
            </v-col>
            </v-row>
            <v-row cols="12" justify="center" class="mb-4">
                <v-col cols="6">
                    <v-card v-if="eventsAccepted.length > 0">
                        <v-list>
                            <v-list-item three-line :key="event" v-for="(event, index) in eventsAccepted">
                                <v-list-item-content>
                                    <v-list-item-title class="black--text">{{event.name}}</v-list-item-title>
                                    <v-list-item-subtitle class="black--text">
                                        {{event.date}}
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle class="black--text">
                                        {{event.details}}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-btn @click="declineAccepted(index)" color="secondary" class="mt-3">
                                        <v-icon class="black--text">mdi-minus-circle</v-icon>
                                    </v-btn>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list>

                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div v-if="user" v-on:load="fetchEvents"></div>
    </div>
</template>

<script>
    import { db } from '@/main';
    export default {
        name: 'home',
        props: {
            user: Object
        },
        data: () => ({
            balanceToPay: 0,
            balanceToGetPayed: 0,
            eventsOpen: [],
            eventsOpenID: [],
            eventsAccepted: [],
            eventsDeclined: [],
            eventsAcceptedID: [],
            eventsDeclinedID: [],
            openToPay: 0,
            openToGetPayed: 0,
            ready: false
        }),
        methods: {
            acceptEvent(index) {
                let self = this;
                db.collection('Users').doc(self.user.email).collection('EventsOpen').get().then((res) => {
                    let event = res.docs[index].data();
                    db.collection('Users').doc(self.user.email).collection('EventsAccepted').add(event).then(() => {
                        db.collection('Users').doc(self.user.email).collection('EventsOpen').doc(self.eventsOpenID[index]).delete().then(() => {
                            self.fetchEvents();
                        });
                    });
                });
            },
            declineEvent(index) {
                let self = this;
                db.collection('Users').doc(self.user.email).collection('EventsOpen').get().then((res) => {
                    let event = res.docs[index].data();
                    db.collection('Users').doc(self.user.email).collection('EventsDeclined').add(event).then(() => {
                        db.collection('Users').doc(self.user.email).collection('EventsOpen').doc(self.eventsOpenID[index]).delete().then(() => {
                            self.fetchEvents();
                        });
                    });
                });
            },
            declineAccepted(index){
                let self = this;
                db.collection('Users').doc(self.user.email).collection('EventsAccepted').get().then((res) => {
                    let event = res.docs[index].data();
                    db.collection('Users').doc(self.user.email).collection('EventsDeclined').add(event).then(() => {
                        db.collection('Users').doc(self.user.email).collection('EventsAccepted').doc(self.eventsAcceptedID[index]).delete().then(() => {
                            self.fetchEvents();
                        });
                    });
                });
            },
            fetchEvents() {
                let self = this;
                self.ready = false;
                self.eventsOpen = [];
                self.eventsOpenID= [];
                self.eventsAccepted = [];
                self.eventsDeclined = [];
                self.eventsAcceptedID = [];
                self.eventsDeclinedID = [];

                db.collection('Users').doc(self.user.email).collection('EventsOpen').get().then((res) => {
                    for(let i in res.docs){
                        self.eventsOpen[i] = res.docs[i].data();
                        self.eventsOpenID[i] = res.docs[i].id;
                    }
                });
                db.collection('Users').doc(self.user.email).collection('EventsAccepted').get().then((res) => {
                    for(let i in res.docs){
                        self.eventsAccepted[i] = res.docs[i].data();
                        self.eventsAcceptedID[i] = res.docs[i].id;
                    }
                });
                db.collection('Users').doc(self.user.email).collection('EventsDeclined').get().then((res) => {
                    for(let i in res.docs){
                        self.eventsDeclined[i] = res.docs[i].data();
                        self.eventsDeclinedID[i] = res.docs[i].id;
                    }
                }).then(() => {
                    self.ready = true;
                });
            },
            fetchBalance() {
                let self = this;
                db.collection('Users').doc(self.user.email).collection('MoneyOpen').get().then((reso) => {
                    for(let i in reso.docs){
                        reso.docs[i].data().Amount < 0 ? self.openToPay += reso.docs[i].data().Amount : self.openToGetPayed += reso.docs[i].data().Amount;
                    }
                })
            }
        },
        mounted() {
            this.fetchEvents();
            this.fetchBalance();
        },
        watch: {
            user: function() {
                this.fetchEvents();
                this.fetchBalance();
            }
        }
    }
</script>

<style scoped>
    * {
        color: #fff !important;
    }
    #app{
        background: rgba(0, 0, 0, 0) !important;
    }
    .primary-color {
        color: #fff !important;
    }


</style>