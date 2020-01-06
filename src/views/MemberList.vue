<template>
    <v-content>
        <h1>Member</h1>
        <v-list :key="member" v-for="member in members">
            <v-list-item-content>
                {{member}}
            </v-list-item-content>
        </v-list>
    </v-content>
</template>

<script>
    import {db} from "../main";

    export default {
        name: "MemberList",
        props: {
            organization: String
        },
        data: () => {
            return {
                members: null
            }
        },
        methods: {
            getMembers() {
                let self = this;
                db.collection('Organization').doc(this.organization).get().then((res) => {
                    self.members = res.data().Users;
                });
            }
        },
        mounted() {
            this.getMembers();
        }
    }
</script>

<style scoped>

</style>