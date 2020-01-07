<template>
    <v-content>
        <h1>Money</h1>
        <v-list v-if="openToPay != 0 && ready">
            <v-list-item>
                <h2>Open to Pay: <span style="color: rgb(200, 0, 0)">{{openToPay}}</span> $</h2>
            </v-list-item>
        </v-list>
        <v-list v-if="ready">
            <h2>All sales</h2>
            <v-list-item :key="sale" v-for="sale in sales" :class="getClass(sale)">
                <v-list-item-content>
                    Date: <b>{{sale.Date}}</b>
                </v-list-item-content>
                <v-list-item-content>
                    Amount: <b>{{sale.Amount}}</b>
                </v-list-item-content>
                <v-list-item-content>
                    Pupose: <b>{{sale.Purpose}}</b>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-btn id="addSale">+</v-btn>
    </v-content>
</template>

<script>
    import {db} from "../main";

    export default {
        name: "Money",
        props: {
            user: Object
        },
        data: () => {
            return {
                sales: [],
                ready: false,
                openToPay: 0
            }
        },
        methods: {
            getMoney(){
                let self = this;
                db.collection('Users').doc(self.user.email).collection('Money').get().then((res) => {
                    for(let i in res.docs){
                        self.sales[i] = res.docs[i].data();
                        res.docs[i].data().Amount < 0 ? self.openToPay += res.docs[i].data().Amount : self.openToPay + 0;
                    }
                    self.ready = true;
                });


            },
            getClass(sale){
                return sale.Amount < 0 ? "negative" : "positive";
            },
            open() {
                let temp = 0;
                for(let i in this.sales){
                    if(i.Amount < 0){
                        temp += i.Amount;
                    }
                }
                this.openToPay = temp;
            }
        },
        mounted() {
            this.getMoney();
        }
    }
</script>

<style scoped>
    #addSale{
        position: absolute;
        right: 5px;
        bottom: 5px;
    }
    .negative{
        background-color: rgba(200, 0, 0, 0.2);
    }
    .positive{
        background-color: rgba(0, 200, 0, 0.2);
    }

</style>