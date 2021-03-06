import WebCamPlayer from '@/phaser/scene/ShopManagerScene/uiObjects/WebCamPlayer';
import SocketManager from '@/utils/socket/SocketManager';

const CONSTRAINTS = {
  video: {
    width: { ideal: 1280, max: 1920 },
    height: { ideal: 720, max: 1080 },
  },
  audio: false,
};

const CONFIG = {
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

class OwnerWebCamPlayer extends WebCamPlayer {
  constructor(scene, width = 0, height = 0) {
    super(scene, width, height);
    this._senderPeerConnection = undefined;

    const socket = new SocketManager();

    (async () => {
      this._senderPeerConnection = new RTCPeerConnection(CONFIG);

      this._senderPeerConnection.onicecandidate = ({ candidate }) => {
        if (!candidate) return;
        socket.emit('webRtcVideo:senderIceCandidate', candidate);
      };

      const videoStream = await navigator.mediaDevices
        .getUserMedia(CONSTRAINTS)
        .then(stream => {
          this._video.srcObject = stream;
          this._video.addEventListener('loadedmetadata', () => {
            this._video.play();
          });

          return stream;
        })
        .catch(() => this._setErrorMsg());

      videoStream.getTracks().forEach(track => {
        this._senderPeerConnection.addTrack(track, videoStream);
      });

      const offer = await this._senderPeerConnection.createOffer({
        offerToReceiveVideo: false,
      });

      await this._senderPeerConnection.setLocalDescription(offer);

      socket.emit('webRtcVideo:senderOffer', offer);
    })();

    socket.on('webRtcVideo:senderAnswer', answer => {
      this._senderPeerConnection.setRemoteDescription(answer);
    });

    socket.on('webRtcVideo:senderIceCandidate', iceCandidate => {
      this._senderPeerConnection.addIceCandidate(iceCandidate);
    });

    this.on('destroy', () => {
      this._senderPeerConnection.close();
      socket.removeAllListeners();
    });
  }

  _setErrorMsg() {
    this.setBackgroundColor(`FFFFFF`);
    const html = `<div>???????????? ???????????? ?????? ??? ????????????.</div>`;
    this._setHTML(html);
  }
}

export default OwnerWebCamPlayer;
