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

  getInstance() {
    return this.socketInstance; // initInstance가 수행되지 않으면 undefined가 반환된다
  },
};

export default Socket;
