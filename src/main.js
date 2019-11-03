import Vue from 'vue';
import App from './App.vue';
import Login from './views/Login.vue';
import Game from './views/Game.vue';
import Home from './views/Home.vue';
import Imprint from './views/Imprint';
import VueRouter from 'vue-router';


Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
      {
          path: '/views/home',
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
          redirect: '/views/home'
      }
  ]
});
new Vue({
  render: h => h(App),
  router
}).$mount('#app');
