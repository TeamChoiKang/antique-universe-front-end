class PeerConnection {
  constructor(socket) {
    this._socket = socket;
    this._configuration = {
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
          ],
        },
      ],
    };
  }

  connect() {
    throw new Error('Implements PeerConnection connect method');
  }
}

export default PeerConnection;
