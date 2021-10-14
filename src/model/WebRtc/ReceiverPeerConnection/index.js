import PeerConnection from '@/model/WebRtc/PeerConnection';

class ReceiverPeerConnection extends PeerConnection {
  constructor(socket, socketId) {
    super(socket);
    this._receiverPeerConnection = undefined;
    this._socketId = socketId;
  }

  async connect() {
    this._receiverPeerConnection = new RTCPeerConnection(this._configuration);

    this._receiverPeerConnection.onicecandidate = ({ candidate }) => {
      if (!candidate) return;
      this._socket.emit('webRtcAudio:receiverIceCandidate', {
        candidate,
        socketId: this._socketId,
      });
    };

    this._receiverPeerConnection.ontrack = ({ streams }) => {
      const audio = document.createElement('audio');
      [audio.srcObject] = streams;
      audio.play();
      document.body.appendChild(audio);
    };

    const offer = await this._receiverPeerConnection.createOffer({
      offerToReceiveAudio: true,
    });

    await this._receiverPeerConnection.setLocalDescription(offer);

    this._socket.emit('webRtcAudio:receiverOffer', { offer, socketId: this._socketId });
  }

  close() {
    this._receiverPeerConnection.close();
  }

  async setRemoteDescription(answer) {
    await this._receiverPeerConnection.setRemoteDescription(answer);
  }

  async addIceCandidate(iceCandidate) {
    await this._receiverPeerConnection.addIceCandidate(iceCandidate);
  }
}

export default ReceiverPeerConnection;
