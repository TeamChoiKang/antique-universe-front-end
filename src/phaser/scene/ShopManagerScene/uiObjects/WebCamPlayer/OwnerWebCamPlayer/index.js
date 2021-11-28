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
        'stun.l.google.com:19302',
        'stun1.l.google.com:19302',
        'stun2.l.google.com:19302',
        'stun3.l.google.com:19302',
        'stun4.l.google.com:19302',
        'stun.ekiga.net',
        'stun.ideasip.com',
        'stun.rixtelecom.se',
        'stun.schlund.de',
        'stun.stunprotocol.org:3478',
        'stun.voiparound.com',
        'stun.voipbuster.com',
        'stun.voipstunt.com',
        'stun.voxgratia.org',
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
        console.log(candidate);
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
    const html = `<div>카메라를 지원하지 않는 것 같습니다.</div>`;
    this._setHTML(html);
  }
}

export default OwnerWebCamPlayer;
