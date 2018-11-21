import api from 'api';
import * as types from './types';

export const query = async ({commit}, payload = {}) => {
  const params = {
    function: 'TIME_SERIES_INTRADAY',
    symbol: 'NVDA',
    interval: '5min',
    ...payload
  };
  const result = await api.query(params);
  commit(types.QUERY, result);
};