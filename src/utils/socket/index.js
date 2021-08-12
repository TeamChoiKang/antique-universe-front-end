import { LOCAL_SERVER } from '@/constants';
import io from '@/package/socket';

const Socket = {
  socketInstance: undefined,
  getInstance() {
    if (!this.socketInstance) this.socketInstance = io(LOCAL_SERVER);
    return this.socketInstance;
  },
};

export default Socket;
