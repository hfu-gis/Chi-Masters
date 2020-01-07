<template>
    <v-content>
        <h1>Member</h1>
        <v-list >
            <v-list-item :key="member" v-for="(member, index) in members">
                <v-list-item-content>
                    {{member}}
                </v-list-item-content>
                <v-list-item-action v-if="role === 'ADMIN' || role === 'CASHIER'">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" class="mr-2 secondary">
                                <v-icon>mdi-settings</v-icon>
                                <span class="ml-2">{{roles[index]}}</span>
                            </v-btn>
                        </template>
                        <v-list v-model="roles[index]">
                            <v-list-item @click="changeRoleTo(member, 'ADMIN', index)">
                                <v-icon class="mr-2">mdi-star-outline</v-icon>
                                <v-list-item-title>Admin</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="changeRoleTo(member, 'CASHIER', index)">
                                <v-icon class="mr-2">mdi-cash-usd-outline</v-icon>
                                <v-list-item-title>Cashier</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="changeRoleTo(member, 'WRITER', index)">
                                <v-icon class="mr-2">mdi-lead-pencil</v-icon>
                                <v-list-item-title>Writer</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="changeRoleTo(member, 'MEMBER', index)">
                                <v-icon class="mr-2">mdi-account</v-icon>
                                <v-list-item-title>Member</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-list-item-action>
                <v-list-item-action v-if="role == 'ADMIN'">
                    <v-btn class="accent" @click="deleteUserPopUp(member, index)">
                        <v-icon>mdi-delete-forever</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <v-row justify="center">
            <v-dialog v-model="dialogRole"  width="500px" max-width="90%">
                <v-card>
                    <v-card-title class="headline">Change Role</v-card-title>
                    <v-card-text>
                        Are You sure you want to change the Role of <b>{{changeRoleFromMember}}</b> to <b>{{changeRoleFromMemberTo}}</b>?
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="accent" text @click="dialogRole = false">
                            Disagree
                        </v-btn>
                        <v-btn class="primary" text @click="changeRole()">
                            Agree
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-row justify="center">
            <v-dialog v-model="dialogDeleteUser"  width="500px" max-width="90%">
                <v-card>
                    <v-card-title class="headline">Delete User</v-card-title>
                    <v-card-text>
                        Are You sure you want to delete the user <b>{{userToDelete}}</b>?
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="accent" text @click="dialogDeleteUser = false">
                            Disagree
                        </v-btn>
                        <v-btn class="primary" text @click="deleteUser">
                            Agree
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-content>
</template>

<script>
    import {db} from "../main";

    export default {
        name: "MemberList",
        props: {
            organization: String,
            role: String
        },
        data: () => {
            return {
                members: [],
                roles: [],
                dialogRole: false,
                dialogDeleteUser: false,
                changeRoleFromMember: null,
                changeRoleFromMemberTo: null,
                changeRoleFromIndex: null,
                userToDelete: null,
                userToDeleteIndex: null
            }
        },
        methods: {
            getMembers() {
                let self = this;
                db.collection('Organization').doc(this.organization).get().then((res) => {
                    self.members = res.data().Users;
                }).then(() => {
                    for(let i in self.members){
                        db.collection('Users').doc(this.members[i]).get().then((res) => {
                            self.roles[self.roles.length] = res.data().Role;
                        });
                    }
                })

            },
            changeRoleTo(member, role, index){
                this.changeRoleFromMember = member;
                this.changeRoleFromMemberTo = role;
                this.changeRoleFromIndex = index;
                this.dialogRole = true;
            },
            changeRole(){
                let self = this;
                db.collection('Users').doc(self.changeRoleFromMember).update({"Role": self.changeRoleFromMemberTo});
                this.roles[self.changeRoleFromIndex] = self.changeRoleFromMemberTo;
                self.dialogRole = false;

                this.changeRoleFromMember = null;
                this.changeRoleFromMemberTo = null;
                this.changeRoleFromIndex = null;
            },
            deleteUserPopUp(member, index) {
                this.userToDelete = member;
                this.userToDeleteIndex = index;
                this.dialogDeleteUser = true;
            },
            deleteUser() {
                this.members.splice(this.userToDeleteIndex, 1);
                this.roles.splice(this.userToDeleteIndex, 1);
                this.dialogDeleteUser = false;
            }
        },
        mounted() {
            this.getMembers();
        }
    }
</script>

<style scoped>

</style>