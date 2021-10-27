import Phaser from '@/package/phaser';
import * as sceneKeys from '@/phaser/scene/sceneKeys';
import StuffBoxFactory from '@/phaser/scene/ShopManagerScene/uiObjects/StuffBox/StuffBoxFactory';
import * as stuffBoxType from '@/phaser/scene/ShopManagerScene/uiObjects/StuffBox/stuffBoxType';
import OwnerTextBox from '@/phaser/scene/ShopManagerScene/uiObjects/TextBox/OwnerTextBox';
import VisitorTextBox from '@/phaser/scene/ShopManagerScene/uiObjects/TextBox/VisitorTextBox';
import OwnerWebCamPlayer from '@/phaser/scene/ShopManagerScene/uiObjects/WebCamPlayer/OwnerWebCamPlayer';
import VisitorWebCamPlayer from '@/phaser/scene/ShopManagerScene/uiObjects/WebCamPlayer/VisitorWebCamPlayer';
import SocketManager from '@/utils/socket/SocketManager';

const TOP_MARGIN = 10;
const MANAGER_MIN_WIDTH = 1100;
const MANAGER_MAX_WIDTH = 2200;
const MANAGER_RATIO = 0.39;

const WEB_CAM_PLAYER_MIN_WIDTH = 430;
const WEB_CAM_PLAYER_MAX_WIDTH = 860;

const TEXT_BOX_COLOR = `3498db`;
const TEXT_BOX_MIN_WIDTH = 430;
const TEXT_BOX_MAX_WIDTH = 860;

const STUFF_LIST_BOX_MIN_WIDTH = 650;
const STUFF_LIST_BOX_MAX_WIDTH = 1300;

class ShopManagerScene extends Phaser.Scene {
  constructor(shopScene, shopName) {
    super(sceneKeys.SHOP_MANAGER_SCENE_KEY);
    this._shopScene = shopScene;
    this._shopName = shopName;
    this._socket = new SocketManager();
    this._webCamPlayer = undefined;
    this._shopInfoTextBox = undefined;
    this._stuffBox = undefined;
  }

  create() {
    this._registerEventHandler();

    this._socket.emit('map:getShopOwner', this._shopName);

    this._socket.on('map:getShopOwner', async ({ owner }) => {
      if (owner === this._socket.id) {
        this._webCamPlayer = new OwnerWebCamPlayer(this);
        this._shopInfoTextBox = new OwnerTextBox(this, TEXT_BOX_COLOR);
        this._stuffBox = new StuffBoxFactory(this).createStuffBox(stuffBoxType.ADMIN_STUFF_BOX);
      } else {
        this._webCamPlayer = new VisitorWebCamPlayer(this, owner);
        this._shopInfoTextBox = new VisitorTextBox(this, TEXT_BOX_COLOR);
        this._stuffBox = new StuffBoxFactory(this).createStuffBox(stuffBoxType.NORMAL_STUFF_BOX);
      }

      this._setSizeAndPosition(this.cameras.main.width);
    });
  }

  _registerEventHandler() {
    const resize = gameSize => this._setSizeAndPosition(gameSize.width);

    this.scale.on('resize', resize);

    this._shopScene.events.once('shutdown', () => {
      this.scale.off('resize', resize);
      this._socket.removeAllListeners();
      this.scene.remove(this);
    });
  }

  _setSizeAndPosition(width) {
    if (!this._webCamPlayer) return;
    if (!this._shopInfoTextBox) return;
    if (!this._stuffBox) return;

    const realManagerWidth = Math.min(
      Math.max(Number.parseInt((width * 85.93) / 100, 10), MANAGER_MIN_WIDTH),
      MANAGER_MAX_WIDTH,
    );
    const realManagerHeight = Number.parseInt(realManagerWidth * MANAGER_RATIO, 10);

    const realWebCamPlayerWidth = Math.min(
      Math.max(Number.parseInt((realManagerWidth * 39.09) / 100, 10), WEB_CAM_PLAYER_MIN_WIDTH),
      WEB_CAM_PLAYER_MAX_WIDTH,
    );
    this._webCamPlayer.setSizeWithFixedRatio(realWebCamPlayerWidth);
    this._webCamPlayer.setPosition(
      width / 2 - realManagerWidth / 2 + realWebCamPlayerWidth / 2,
      TOP_MARGIN + this._webCamPlayer.height / 2,
    );

    const realTextBoxWidth = Math.min(
      Math.max(Number.parseInt((realManagerWidth * 39.09) / 100, 10), TEXT_BOX_MIN_WIDTH),
      TEXT_BOX_MAX_WIDTH,
    );
    this._shopInfoTextBox.setSizeWithFixedRatio(realTextBoxWidth);
    this._shopInfoTextBox.setPosition(
      width / 2 - realManagerWidth / 2 + realTextBoxWidth / 2,
      TOP_MARGIN + realManagerHeight - this._shopInfoTextBox.height / 2,
    );

    const realStuffListBoxWidth = Math.min(
      Math.max(Number.parseInt((realManagerWidth * 59.09) / 100, 10), STUFF_LIST_BOX_MIN_WIDTH),
      STUFF_LIST_BOX_MAX_WIDTH,
    );
    this._stuffBox.setSizeWithFixedRatio(realStuffListBoxWidth);
    this._stuffBox.setPosition(
      width / 2 + realManagerWidth / 2 - this._stuffBox.width / 2,
      TOP_MARGIN + this._stuffBox.height / 2,
    );
  }
}

export default ShopManagerScene;
