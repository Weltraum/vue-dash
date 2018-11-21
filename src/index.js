import Vue from 'vue';
import App from './App';

import 'plugins/bemcn';
import 'plugins/vuetify';
import 'store';

import router from './router';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
