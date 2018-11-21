import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import dashboard from 'pages/Dashboard/router';
import help from 'pages/Help/router';

const routes = [
  dashboard,
  help
];

export default new VueRouter({
  mode: 'history',
  routes
});