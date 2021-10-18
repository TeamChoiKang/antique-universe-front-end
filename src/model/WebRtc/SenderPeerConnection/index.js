import PeerConnection from '@/model/WebRtc/PeerConnection';

const CONSTRAINTS = {
  audio: true,
};

class SenderPeerConnection extends PeerConnection {
  constructor(socket) {
    super(socket);
    this._senderPeerConnection = undefined;
    this._stream = undefined;
  }

  async connect() {
    this._socket.on('webRtc:senderAnswer', async answer => {
      await this._senderPeerConnection.setRemoteDescription(answer);
    });

    this._socket.on('webRtc:senderIceCandidate', async iceCandidate => {
      await this._senderPeerConnection.addIceCandidate(iceCandidate);
    });

    this._stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);

    this._senderPeerConnection = new RTCPeerConnection(this._configuration);

    this._senderPeerConnection.onicecandidate = ({ candidate }) => {
      if (!candidate) return;
      this._socket.emit('webRtc:senderIceCandidate', candidate);
    };

    this._stream.getTracks().forEach(track => {
      this._senderPeerConnection.addTrack(track, this._stream);
    });

    const offer = await this._senderPeerConnection.createOffer({
      offerToReceiveAudio: false,
    });

    await this._senderPeerConnection.setLocalDescription(offer);

    this._socket.emit('webRtc:senderOffer', offer);
  }

  close() {
    this._senderPeerConnection.close();
  }
}

export default SenderPeerConnection;
