import RequestHandler from './RequestHandler';
import endpoints from './endpoints';

export default class Api extends RequestHandler {
  async query(payload) {
    return await this.get(endpoints.query, {
      ...payload,
      apikey: `${apikey}`
    });
  }
}