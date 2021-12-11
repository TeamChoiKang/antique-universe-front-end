import WebCamPlayer from '@/phaser/scene/ShopManagerScene/uiObjects/WebCamPlayer';
import SocketManager from '@/utils/socket/SocketManager';

const CONFIG = {
  iceServers: [
    {
      urls: ['turn:turn.antique-universe.asuscomm.com:5349'],
      credential: 'jin!@12young',
      username: 'user1',
    },
  ],
};

class VisitorWebCamPlayer extends WebCamPlayer {
  constructor(scene, owner, width = 0, height = 0) {
    super(scene, width, height);
    this._ownerSocketId = owner;
    this._shopManagerScene = scene;
    this._receiverPeerConnection = undefined;

    const socket = new SocketManager();

    const connectPeer = async () => {
      this._receiverPeerConnection = new RTCPeerConnection(CONFIG);

      this._receiverPeerConnection.onicecandidate = ({ candidate }) => {
        if (!candidate) return;
        socket.emit('webRtcVideo:receiverIceCandidate', candidate);
      };

      this._receiverPeerConnection.ontrack = ({ streams }) => {
        [this._video.srcObject] = streams;
        this._video.addEventListener('loadedmetadata', () => {
          this._video.play();
        });
      };

      const offer = await this._receiverPeerConnection.createOffer({
        offerToReceiveVideo: true,
      });

      await this._receiverPeerConnection.setLocalDescription(offer);

      socket.emit('webRtcVideo:receiverOffer', offer);
    };

    socket.emit('webRtcVideo:senderExist');

    socket.on('webRtcVideo:senderExist', () => connectPeer());

    socket.on('webRtcVideo:receiverAnswer', answer => {
      this._receiverPeerConnection.setRemoteDescription(answer);
    });

    socket.on('webRtcVideo:receiverIceCandidate', iceCandidate => {
      this._receiverPeerConnection.addIceCandidate(iceCandidate);
    });

    socket.on('character:disconnection', socketId => {
      if (socketId === this._ownerSocketId) {
        this._receiverPeerConnection.close();
        this._receiverPeerConnection = undefined;
        this._video.srcObject = undefined;
      }
    });

    this.on('destroy', () => {
      if (this._receiverPeerConnection) this._receiverPeerConnection.close();
      socket.removeAllListeners();
    });
  }
}

export default VisitorWebCamPlayer;
