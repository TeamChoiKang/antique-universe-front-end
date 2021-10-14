import * as sceneKeys from '@/phaser/scene/sceneKeys';
import DomBox from '@/phaser/scene/ShopManagerScene/uiObjects/DomBox';
import SocketManager from '@/utils/socket/SocketManager';

const WEB_CAM_PLAYER_RATIO = 0.558;
const WEB_CAM_PLAYER_ID = 'web-cam-player';
const CONSTRAINTS = {
  video: {
    width: { ideal: 1280, max: 1920 },
    height: { ideal: 720, max: 1080 },
  },
};

class WebCamPlayer extends DomBox {
  constructor(scene, width = 0, height = 0) {
    super(scene, `${WEB_CAM_PLAYER_ID}-dom-wrapper`, width, height);
    this.setVideo();
    this.setBackgroundColor(`000000`);
    this._video = this.getChildByID(WEB_CAM_PLAYER_ID);

    const socket = new SocketManager();

    socket.emit('map:getShopOwner', sceneKeys.SHOP_SCENE_KEY);

    socket.on('map:getShopOwner', async ({ owner }) => {
      if (owner === socket.id) {
        const videoStream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
        this._video.srcObject = videoStream;
        this._video.addEventListener('loadedmetadata', () => {
          this._video.play();
        });
      }
    });
  }

  setVideo() {
    const html = `
      <video id="${WEB_CAM_PLAYER_ID}"></video>
      <style>
        #${WEB_CAM_PLAYER_ID} {
          width: 100%;
          height: 100%;
        }
      </style>
    `;
    this._setHTML(html);
  }

  setErrorMsg() {
    this.setBackgroundColor(`FFFFFF`);
    const html = `<div>카메라를 지원하지 않는 것 같습니다.</div>`;
    this._setHTML(html);
  }

  setSizeWithFixedRatio(width) {
    this.setSize(width, Number.parseInt(width * WEB_CAM_PLAYER_RATIO, 10));
  }
}

export default WebCamPlayer;
