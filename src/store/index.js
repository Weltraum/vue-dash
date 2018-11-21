import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modules = {
  charts: require('modules/charts').model
};

const store = new Vuex.Store({
  modules,
  getters: {},
  state: {},
  actions: {},
  mutations: {}
});

if (module.hot) {
  module.hot.accept(['modules/charts'], () => {
    store.hotUpdate({
      modules
    });
  });
}