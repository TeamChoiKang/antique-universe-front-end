import Phaser from '@/package/phaser';
import * as sceneKeys from '@/phaser/scene/sceneKeys';
import * as mock from '@/phaser/scene/ShopManagerScene/mock';
import StuffBoxFactory from '@/phaser/scene/ShopManagerScene/uiObjects/StuffBox/StuffBoxFactory';
import TextBox from '@/phaser/scene/ShopManagerScene/uiObjects/TextBox';
import WebCamPlayer from '@/phaser/scene/ShopManagerScene/uiObjects/WebCamPlayer';

const TOP_MARGIN = 10;
const MANAGER_MIN_WIDTH = 1100;
const MANAGER_MAX_WIDTH = 2200;
const MANAGER_RATIO = 0.39;

const WEB_CAM_PLAYER_MIN_WIDTH = 430;
const WEB_CAM_PLAYER_MAX_WIDTH = 860;

const TEXT_BOX_COLOR = 0x3498db;
const { TEXT_BOX_CONTENTS } = mock;
const TEXT_BOX_MIN_WIDTH = 430;
const TEXT_BOX_MAX_WIDTH = 860;

const STUFF_LIST_BOX_MIN_WIDTH = 650;
const STUFF_LIST_BOX_MAX_WIDTH = 1300;

const { STUFF_LIST_BOX_STUFFS } = mock;

class ShopManagerScene extends Phaser.Scene {
  constructor(shopScene, type) {
    super(sceneKeys.SHOP_MANAGER_SCENE_KEY);
    this._type = type;
    this._shopScene = shopScene;
    this._webCamPlayer = undefined;
    this._shopInfoTextBox = undefined;
    this._stuffBox = undefined;
  }

  preload() {
    this.load.setCORS('*');
  }

  create() {
    this._initChildGameObject();
    this._registerEventHandler();
    this._setSizeAndPosition(this.cameras.main.width, this.cameras.main.height);
  }

  _registerEventHandler() {
    const resize = gameSize => this._setSizeAndPosition(gameSize.width, gameSize.height);

    this.scale.on('resize', resize);

    this._shopScene.events.once('shutdown', () => {
      this.scale.off('resize', resize);
      this.scene.remove(this);
    });
  }

  _initChildGameObject() {
    this._webCamPlayer = new WebCamPlayer(this);
    this._shopInfoTextBox = new TextBox(this, TEXT_BOX_CONTENTS, TEXT_BOX_COLOR);
    this._stuffBox = new StuffBoxFactory(this).createStuffBox(STUFF_LIST_BOX_STUFFS, this._type);
  }

  _setSizeAndPosition(width) {
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
