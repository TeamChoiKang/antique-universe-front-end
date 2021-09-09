import { LOCAL_SERVER } from '@/constants';
import io from '@/package/socket';

class Socket {
  static socketInstance;

  static isConnected = false;

  static getInstance() {
    if (!Socket.socketInstance) {
      Socket.socketInstance = io(LOCAL_SERVER, {
        autoConnect: false,
      });
    }
    return Socket.socketInstance;
  }

  static connect(user) {
    if (!user || Socket.isConnected) {
      return;
    }
    const socketInstance = Socket.getInstance();
    socketInstance.io.opts.query = user;
    socketInstance.connect();
    Socket.isConnected = true;
    socketInstance.on('connect_error', () => {
      Socket.isConnected = false;
    });
  }
}

export default Socket;
