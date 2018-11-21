import axios from 'axios';
import {get as getValue} from 'object-path';

export default class RequestHandler {
  axios = axios;
  errorSubscribers = {};

  subscribeError(name, fn) {
    if (!name || typeof fn !== 'function') {
      return;
    }
    this.errorSubscribers[name] = fn;
  }

  unSubscribeError(name) {
    if (name && !!this.errorSubscribers[name]) {
      delete this.errorSubscribers[name];
    }
  }

  async get(url, payload) {
    try {
      const params = payload ? {
        params: payload
      } : {};
      const res = await this.axios.get(url, params);
      return await res.data;
    } catch(res) {
      return this.errorHandler(res);
    }
  }

  async getBlob(url, payload, type) {
    try {
      const res = await this.axios({
        url,
        method: 'GET',
        responseType: 'blob',
        params: payload
      });
      const result = await res.data;
      return new Blob([result], {type});
    } catch(res) {
      return this.errorHandler(res);
    }
  }

  async post(url, payload = {}) {
    try {
      const res = await this.axios.post(url, payload);
      return await res.data;
    } catch(res) {
      return this.errorHandler(res);
    }
  }

  async patch(url, payload = {}) {
    try {
      const res = await this.axios.patch(url, payload);
      return await res.data;
    } catch(res) {
      return this.errorHandler(res);
    }
  }

  async delete(url, payload = {}) {
    try {
      const res = await this.axios.delete(url, payload);
      return await res.data;
    } catch(res) {
      return this.errorHandler(res);
    }
  }

  errorHandler(res) {
    const response = getValue(res, 'response');
    const config = getValue(res, 'config');
    const data = {
      status: getValue(response, 'status'),
      response: getValue(response, 'data'),
      method: getValue(config, 'method'),
      url: getValue(config, 'url')
    };
    const message = `Error while request ${data.method} ${data.url}`;

    Object.keys(this.errorSubscribers)
      .forEach(key => this.errorSubscribers[key](data));

    if (!res || !res.response || !res.response.data) {
      console.error(res);
      return {error: 'no response from server'};
    }
    return {error: message, ...res.response.data};
  }
}