import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue';
import Register from '../views/Register'
import Home from '../views/Home.vue';
import Calendar from "../views/Calendar";
import Money from "../views/Money";
import Settings from "../views/Settings";
import Profile from "../views/Profile";

Vue.use(VueRouter);

export default new VueRouter({

    routes: [
        {
            path: '/views/Home',
            name: 'home',
            component: Home
        },
        {
            path: '/views/Profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/views/Login',
            name: 'login',
            component: Login
        },
        {
            path: '/views/Register',
            name: 'register',
            component: Register
        },
        {
            path: '/views/Calendar',
            name: 'calendar',
            component: Calendar
        },
        {
            path: '/views/Money',
            name: 'money',
            component: Money
        },
        {
            path: '/views/Settings',
            name: 'settings',
            component: Settings
        },
        {
            path: '*',
            redirect: '/views/Home'
        }

    ]
});