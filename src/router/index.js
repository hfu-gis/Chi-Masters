import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue';
import Game from '../views/Game.vue';
import Home from '../views/Home.vue';
import Imprint from '../views/Imprint';

Vue.use(VueRouter);

export default new VueRouter({

    routes: [
        {
            path: '/views/Home',
            name: 'home',
            component: Home
        },
        {
            path: '/views/Login',
            name: 'login',
            component: Login
        },
        {
            path: '/views/Game',
            name: 'game',
            component: Game
        },
        {
            path: '/views/Imprint',
            name: 'imprint',
            component: Imprint
        },
        {
            path: '*',
            redirect: '/views/Home'
        }
    ]
});