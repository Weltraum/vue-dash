import * as actions from './actions';
import * as getters from './getters';
import {defaultState, mutations} from './mutations';

const state = defaultState;

export default {
  namespaced: true,
  actions: Object.assign({}, actions),
  state,
  root: true,
  mutations,
  getters
};
