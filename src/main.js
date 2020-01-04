import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import VueTextareaAutosize from 'vue-textarea-autosize';
import firebase from 'firebase/app';
import 'firebase/firestore';
Vue.use(VueTextareaAutosize);

Vue.config.productionTip = false

export const db = firebase.firestore();
new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
