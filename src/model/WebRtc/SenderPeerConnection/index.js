import PeerConnection from '@/model/WebRtc/PeerConnection';

class SenderPeerConnection extends PeerConnection {
  constructor(socket) {
    super(socket);
    this._senderPeerConnection = undefined;
    this._audioStream = undefined;
  }

  async connect() {
    this._socket.on('webRtcAudio:senderAnswer', async answer => {
      await this._senderPeerConnection.setRemoteDescription(answer);
    });

    this._socket.on('webRtcAudio:senderIceCandidate', async iceCandidate => {
      await this._senderPeerConnection.addIceCandidate(iceCandidate);
    });

    this._audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    this._senderPeerConnection = new RTCPeerConnection(this._configuration);

    this._senderPeerConnection.onicecandidate = ({ candidate }) => {
      if (!candidate) return;
      this._socket.emit('webRtcAudio:senderIceCandidate', candidate);
    };

    this._audioStream.getTracks().forEach(track => {
      this._senderPeerConnection.addTrack(track, this._audioStream);
    });

    const offer = await this._senderPeerConnection.createOffer({
      offerToReceiveAudio: false,
    });

    await this._senderPeerConnection.setLocalDescription(offer);

    this._socket.emit('webRtcAudio:senderOffer', offer);
  }

  close() {
    this._senderPeerConnection.close();
  }
}

export default SenderPeerConnection;
