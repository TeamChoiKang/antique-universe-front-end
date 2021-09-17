import Socket from './index';

class SocketManager {
  constructor() {
    this._socketInstance = Socket.getInstance();
    this._events = new Set();
  }

  emit(event, data) {
    this._socketInstance.emit(event, data);
  }

  on(event, callback) {
    this._events.add(event);
    this._socketInstance.on(event, callback);
  }

  once(event, callback) {
    this._events.add(event);
    this._socketInstance.once(event, (...args) => {
      callback(...args);
      this._events.delete(event);
    });
  }

  removeAllListeners(event = '') {
    if (event) {
      this._socketInstance.removeAllListeners(event);
      this._events.delete(event);
    } else {
      this._events.forEach(e => this._socketInstance.off(e));
      this._events.clear();
    }
  }
}

export default SocketManager;
