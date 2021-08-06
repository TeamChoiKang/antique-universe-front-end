import io from '@/package/socket';

const LOCAL_SERVER = 'http://localhost:3001/';

const Socket = {
  socketInstance: undefined,
  getInstance() {
    if (!this.socketInstance) this.socketInstance = io(LOCAL_SERVER);
    return this.socketInstance;
  },
};

export default Socket;
