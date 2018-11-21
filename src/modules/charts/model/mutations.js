import * as types from './types';

export const defaultState = {
  ready: false
};

export const mutations = {
  [types.TEST](state) {
    state.ready = true;
  }
};
