import * as types from './types';

export const defaultState = {
  result: null,
  ready: false
};

export const mutations = {
  [types.QUERY](state, payload) {
    state.ready = true;
    state.result = payload;
  }
};
