import { LOCAL_SERVER } from '@/constants';
import io from '@/package/socket';

const Socket = {
  socketInstance: undefined,
  initInstance(userId) {
    this.socketInstance = io(LOCAL_SERVER, {
      query: {
        userId,
      },
    });
  },
  getInstance(userId) {
    if (userId && !this.socketInstance) {
      this.initInstance(userId);
    }
    return this.socketInstance;
  },
};

export default Socket;
