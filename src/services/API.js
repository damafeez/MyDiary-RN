import axios from 'axios';

const baseURL = 'https://api-mydiary.herokuapp.com/api/v1';
export default class API {
  constructor(token) {
    this.UPDATE_TOKEN(token);
    this.unauthorized = axios.create({
      baseURL,
    });
  }

  UPDATE_TOKEN(token) {
    this.api = axios.create({
      baseURL,
      headers: { 'x-auth-token': token },
    });
  }

  signup(payload) {
    return this.unauthorized.post('/auth/signup', payload);
  }

  login(payload) {
    return this.unauthorized.post('/auth/login', payload);
  }
}