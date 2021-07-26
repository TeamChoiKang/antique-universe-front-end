import HttpClient from '@/api/HttpClient';

export default class ApiService {
  constructor() {
    this._instance = new HttpClient();
  }
}
