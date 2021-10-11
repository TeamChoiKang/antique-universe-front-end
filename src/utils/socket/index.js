import { SOCKET_SERVER_URL } from '@/constants';
import io from '@/package/socket';

class Socket {
  static socketInstance;

  static isConnected = false;

  static getInstance() {
    if (!Socket.socketInstance) {
      Socket.socketInstance = io(SOCKET_SERVER_URL, {
        autoConnect: false,
      });
    }
    return Socket.socketInstance;
  }

  static connect(userId) {
    if (!userId || Socket.isConnected) {
      return;
    }
    const socketInstance = Socket.getInstance();
    socketInstance.io.opts.query = { userId };
    socketInstance.connect();
    Socket.isConnected = true;
    socketInstance.on('connect_error', () => {
      Socket.isConnected = false;
    });
  }
}

export default Socket;
