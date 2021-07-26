import io from '@/package/socket';

const LOCAL_SERVER = 'http://localhost:3001/';
const socketInstance = io(LOCAL_SERVER);

export default socketInstance;
