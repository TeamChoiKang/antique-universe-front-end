class PeerConnection {
  constructor(socket) {
    this._socket = socket;
    this._configuration = {
      iceServers: [
        {
          urls: ['turn:turn.antique-universe.asuscomm.com:5349'],
          credential: 'jin!@12young',
          username: 'user1',
        },
      ],
    };
  }

  connect() {
    throw new Error('Implements PeerConnection connect method');
  }

  close() {
    throw new Error('Implements PeerConnection close method');
  }
}

export default PeerConnection;
