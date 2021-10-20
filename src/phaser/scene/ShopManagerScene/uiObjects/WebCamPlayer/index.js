import DomBox from '@/phaser/scene/ShopManagerScene/uiObjects/DomBox';

const WEB_CAM_PLAYER_RATIO = 0.558;
const WEB_CAM_PLAYER_ID = 'web-cam-player';

class WebCamPlayer extends DomBox {
  constructor(scene, width = 0, height = 0) {
    super(scene, `${WEB_CAM_PLAYER_ID}-dom-wrapper`, width, height);
    this.setVideo();
    this.setBackgroundColor(`000000`);
    this._video = this.getChildByID(WEB_CAM_PLAYER_ID);
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

  setSizeWithFixedRatio(width) {
    this.setSize(width, Number.parseInt(width * WEB_CAM_PLAYER_RATIO, 10));
  }
}

export default WebCamPlayer;
