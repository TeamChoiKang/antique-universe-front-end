import io from '@/package/socket';

const socketUtils = {
  _instance: undefined,
  getConnection() {
    if (!this._instance) this._instance = io('http://localhost:3001/');
    return this._instance;
  },
};

export default socketUtils;
