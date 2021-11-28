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
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302',
            'stun:stun.ekiga.net',
            'stun:stun.ideasip.com',
            'stun:stun.rixtelecom.se',
            'stun:stun.schlund.de',
            'stun:stun.stunprotocol.org:3478',
            'stun:stun.voiparound.com',
            'stun:stun.voipbuster.com',
            'stun:stun.voipstunt.com',
            'stun:stun.voxgratia.org',
          ],
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
