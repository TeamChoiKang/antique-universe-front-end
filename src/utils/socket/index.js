import { LOCAL_SERVER } from '@/constants';
import io from '@/package/socket';

class Socket {
  static socketInstance;

  static getInstance() {
    if (!Socket.socketInstance) {
      Socket.socketInstance = io(LOCAL_SERVER, {
        autoConnect: false,
      });
    }
    return Socket.socketInstance;
  }

  static connect(userId) {
    if (!userId) {
      console.error('can not connect socket because userId is undefined');
      return;
    }
    const socketInstance = Socket.getInstance();
    socketInstance.io.opts.query = { userId };
    socketInstance.connect();
  }
}

export default Socket;
