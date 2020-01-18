<template>
    <v-content>
        <h1>Money</h1>
        <v-list v-if="(openToPay != 0 || openToGetPayed != 0) && ready" class="transparent">
            <v-list-item>
                <h2 class="white--text">Open to pay: <span style="color: rgb(200, 0, 0)">{{openToPay}}</span> $</h2><v-spacer></v-spacer>
                <h2 class="white--text">Open to get payed: <span style="color: rgb(0, 200, 0)">{{openToGetPayed}}</span> $</h2>
            </v-list-item>
            <v-list v-if="ready" class="transparent">
                <h2>Sales open to Pay</h2>
                <v-list-item :key="sale" v-for="(sale, index) in salesOpen" :class="getClass(sale)" class="mb-2">
                    <v-list-item-content>
                        Date: <b>{{sale.Date}}</b>
                    </v-list-item-content>
                    <v-list-item-content>
                        Amount: <b>{{sale.Amount}}$</b>
                    </v-list-item-content>
                    <v-list-item-content>
                        Pupose: <b>{{sale.Purpose}}</b>
                    </v-list-item-content>
                    <v-list-item-action v-if="role === 'ADMIN' || role === 'CASHIER'">
                        <v-btn class="primary mr-2" @click="pay(index)">
                            <v-icon>mdi-check-circle</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-action v-if="role === 'ADMIN' || role === 'CASHIER'">
                        <v-btn class="accent" @click="rejectOpen(index)">
                            <v-icon>mdi-delete-forever</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-list>
        <v-list v-if="ready" class="transparent">
            <h2>All sales</h2>
            <v-list-item :key="sale" v-for="(sale, index) in sales" :class="getClass(sale)" class="mb-2">
                <v-list-item-content>
                    Date: <b>{{sale.Date}}</b>
                </v-list-item-content>
                <v-list-item-content>
                    Amount: <b>{{sale.Amount}}$</b>
                </v-list-item-content>
                <v-list-item-content>
                    Pupose: <b>{{sale.Purpose}}</b>
                </v-list-item-content>
                <v-list-item-action v-if="role === 'ADMIN' || role === 'CASHIER'">
                    <v-btn class="accent" @click="reject(index)">
                        <v-icon>mdi-delete-forever</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>

        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn id="addSale" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">Add a sale</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="4" md="3">
                                    <v-text-field v-model="newAmount" label="Solo" placeholder="Amount" solo></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="8" md="9">
                                    <v-text-field v-model="newPurpose" label="Purpose"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <span cols="12" sm="4" md="3">Date</span><v-spacer></v-spacer>
                                    <v-date-picker v-model="newDatePicker" cols="12" sm="8" md="9" show-current="true"></v-date-picker>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" sm="8" md="4">
                                    <v-checkbox v-model="alreadyPayed" label="Already payed"></v-checkbox>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="addNewSale">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-content>
</template>

<script>
    import {db} from "../main";

    export default {
        name: "Money",
        props: {
            user: Object,
            role: String
        },
        data: () => {
            return {
                sales: [],
                salesOpen: [],
                docIDSales: [],
                docIDSalesOpen: [],
                ready: false,
                openToPay: 0,
                openToGetPayed: 0,
                dialog: false,
                newAmount: 0,
                newDatePicker: new Date().toISOString().substr(0, 10),
                newPurpose: null,
                alreadyPayed: false
            }
        },
        methods: {
            getMoney(){
                let self = this;
                self.openToGetPayed = 0;
                self.openToPay = 0;
                db.collection('Users').doc(self.user.email).collection('Money').get().then((res) => {
                    for(let i in res.docs){
                        self.sales[i] = res.docs[i].data();
                        self.docIDSales[i] = res.docs[i].id;
                    }
                }).then(() => {
                    db.collection('Users').doc(self.user.email).collection('MoneyOpen').get().then((reso) => {
                        for(let i in reso.docs){
                            self.salesOpen[i] = reso.docs[i].data();
                            self.docIDSalesOpen[i] = reso.docs[i].id;
                            reso.docs[i].data().Amount < 0 ? self.openToPay += reso.docs[i].data().Amount : self.openToGetPayed += reso.docs[i].data().Amount;
                        }
                        self.ready = true;
                    })
                });


            },
            getClass(sale){
                return sale.Amount < 0 ? "negative" : "positive";
            },
            addNewSale() {
                let self = this;
                if(this.alreadyPayed){
                    db.collection('Users').doc(self.user.email).collection('Money').add({
                        Amount: (Number)(self.newAmount),
                        Date: self.newDatePicker,
                        Purpose: self.newPurpose
                    }).then(()=>{
                        self.getMoney();
                        self.dialog = false;
                    })
                }else{
                    db.collection('Users').doc(self.user.email).collection('MoneyOpen').add({
                        Amount: (Number)(self.newAmount),
                        Date: self.newDatePicker,
                        Purpose: self.newPurpose
                    }).then(()=>{
                        self.getMoney();
                        self.dialog = false;
                    })
                }
            },
            pay(index) {
                let self = this;
                db.collection('Users').doc(self.user.email).collection('MoneyOpen').doc(self.docIDSalesOpen[index]).get().then((res) => {
                    db.collection('Users').doc(self.user.email).collection('Money').add({
                        Amount: res.data().Amount,
                        Date: res.data().Date,
                        Purpose: res.data().Purpose
                    });
                }).then(() => {
                    self.rejectOpen(index);
                })
            },
            reject(index) {
                let self = this;
                db.collection('Users').doc(self.user.email).collection('Money').doc(self.docIDSales[index]).delete().then(() => {
                    self.sales.splice(index, 1);
                    self.docIDSales.splice(index, 1);
                    self.getMoney();
                });
            },
            rejectOpen(index) {
                let self = this;
                db.collection('Users').doc(self.user.email).collection('MoneyOpen').doc(self.docIDSalesOpen[index]).delete().then(() => {
                    self.salesOpen.splice(index, 1);
                    self.docIDSalesOpen.splice(index, 1);
                    self.getMoney();
                });
            }
        },
        mounted() {
            this.getMoney();
        }
    }
</script>

<style scoped>
    #addSale{
        background-color: #3f51b5;
        position: absolute;
        right: 5px;
        bottom: 5px;
        border-radius: 10em;
        box-shadow: 2px 2px 5px gray;
        height: 5em;
        width: 5em;
    }
    .negative{
        background-color: rgba(200, 0, 0, 0.5);
        border-radius: 3em;
    }
    .positive{
        background-color: rgba(0, 200, 0, 0.5);
        border-radius: 3em;
    }


</style>