import { LOCAL_SERVER } from '@/constants';
import io from '@/package/socket';

const Socket = {
  socketInstance: undefined,
  initInstance(socketId) {
    this.socketInstance = io(LOCAL_SERVER, {
      query: {
        socketId,
      },
    });
  },
  getInstance(socketId) {
    if (socketId && !this.socketInstance) {
      this.initInstance(socketId);
    }
    return this.socketInstance;
  },
};

export default Socket;
