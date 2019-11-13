import Vue from 'vue';
import App from './App.vue';
import Login from './views/Login.vue';
import Game from './views/Game.vue';
import Home from './views/Home.vue';
import Imprint from './views/Imprint';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
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
new Vue({
  render: h => h(App),
  router
}).$mount('#app');
