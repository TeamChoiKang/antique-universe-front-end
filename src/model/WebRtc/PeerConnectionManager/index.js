import ReceiverPeerConnection from '@/model/WebRtc/ReceiverPeerConnection';
import SenderPeerConnection from '@/model/WebRtc/SenderPeerConnection';

class PeerConnectionManager {
  constructor(socket) {
    this._socket = socket;
    this._senderPeerConnection = undefined;
    this._receiverPeerConnectionMap = new Map();

    this._socket.on('webRtcAudio:receiverAnswer', async ({ answer, socketId }) => {
      await this._receiverPeerConnectionMap.get(socketId).setRemoteDescription(answer);
    });

    this._socket.on('webRtcAudio:receiverIceCandidate', async ({ iceCandidate, socketId }) => {
      await this._receiverPeerConnectionMap.get(socketId).addIceCandidate(iceCandidate);
    });
  }

  createSenderPeerConnection() {
    if (this._senderPeerConnection) return this._senderPeerConnection;
    this._senderPeerConnection = new SenderPeerConnection(this._socket);
    this._senderPeerConnection.connect();
    return this._senderPeerConnection;
  }

  closeSenderPeerConnection() {
    if (this._senderPeerConnection) return false;
    this._senderPeerConnection.close();
    this._senderPeerConnection = undefined;
    return true;
  }

  createReceiverPeerConnection(socketId) {
    const newReceiverPeerConnection = new ReceiverPeerConnection(this._socket, socketId);
    newReceiverPeerConnection.connect();
    this._receiverPeerConnectionMap.set(socketId, newReceiverPeerConnection);
  }

  closeReceiverPeerConnection(socketId) {
    if (!this._receiverPeerConnectionMap.has(socketId)) return false;
    this._receiverPeerConnectionMap.get(socketId).close();
    this._receiverPeerConnectionMap.delete(socketId);
    return true;
  }

  closeAllPeerConnection() {
    this._senderPeerConnection.close();
    this._senderPeerConnection = undefined;

    this._receiverPeerConnectionMap.forEach(peerConnection => peerConnection.close());
    this._receiverPeerConnectionMap.clear();
  }
}

export default PeerConnectionManager;
