import * as types from './types';

export const test = ({commit, state, getters}, payload) => {
  state;
  getters;
  commit(types.TEST, payload);
};