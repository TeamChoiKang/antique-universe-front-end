import Phaser from '@/package/phaser';
import * as sceneKeys from '@/phaser/scene/sceneKeys';
import * as mock from '@/phaser/scene/ShopManagerScene/mock';
import LayoutBox from '@/phaser/scene/ShopManagerScene/uiObjects/LayoutBox';
import StuffBoxFactory from '@/phaser/scene/ShopManagerScene/uiObjects/StuffBox/StuffBoxFactory';
import TextBox from '@/phaser/scene/ShopManagerScene/uiObjects/TextBox';
import Video from '@/phaser/scene/ShopManagerScene/uiObjects/Video';

const TOP_MARGIN = 10;
const MANAGER_MIN_WIDTH = 1100;
const MANAGER_MAX_WIDTH = 2200;
const MANAGER_RATIO = 0.39;

const VIDEO_KEY = 'camVideo';
const VIDEO_MIN_WIDTH = 430;
const VIDEO_MAX_WIDTH = 860;
const VIDEO_RATIO = 0.558;

const TEXT_BOX_COLOR = 0x3498db;
const { TEXT_BOX_CONTENTS } = mock;
const TEXT_BOX_MIN_WIDTH = 430;
const TEXT_BOX_MAX_WIDTH = 860;
const TEXT_BOX_RATIO = 0.418;

const STUFF_LIST_BOX_MIN_WIDTH = 650;
const STUFF_LIST_BOX_MAX_WIDTH = 1300;
const STUFF_LIST_BOX_RATIO = 0.661;

const { STUFF_LIST_BOX_STUFFS } = mock;

class ShopManagerScene extends Phaser.Scene {
  constructor(shopScene, type) {
    super(sceneKeys.SHOP_MANAGER_SCENE_KEY);
    this._type = type;
    this._shopScene = shopScene;
    this._layoutBox = undefined;
    this._video = undefined;
    this._shopInfoTextBox = undefined;
    this._stuffBox = undefined;
  }

  preload() {
    this.load.setCORS('*');
    this.load.video(VIDEO_KEY, 'https://labs.phaser.io/assets/video/wormhole.mp4');
  }

  create() {
    this._initChildGameObject();
    this._registerEventHandler();
    this._setSizeAndPosition(this.cameras.main.width, this.cameras.main.height);
    this._video.play(true);
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
    this._layoutBox = new LayoutBox(this);
    this._video = new Video(this, VIDEO_KEY);
    this._shopInfoTextBox = new TextBox(this, TEXT_BOX_CONTENTS, TEXT_BOX_COLOR);
    this._stuffBox = new StuffBoxFactory(this).createStuffBox(STUFF_LIST_BOX_STUFFS, this._type);
  }

  _setSizeAndPosition(width, height) {
    let realManagerWidth = Number.parseInt((width * 85.93) / 100, 10);
    if (MANAGER_MAX_WIDTH < realManagerWidth) realManagerWidth = MANAGER_MAX_WIDTH;
    if (realManagerWidth < MANAGER_MIN_WIDTH) realManagerWidth = MANAGER_MIN_WIDTH;
    const realManagerHeight = Number.parseInt(realManagerWidth * MANAGER_RATIO, 10);

    let realVideoWidth = Number.parseInt((realManagerWidth * 39.09) / 100, 10);
    if (VIDEO_MAX_WIDTH < realVideoWidth) realVideoWidth = VIDEO_MAX_WIDTH;
    if (realVideoWidth < VIDEO_MIN_WIDTH) realVideoWidth = VIDEO_MIN_WIDTH;
    const realVideoHeight = Number.parseInt(realVideoWidth * VIDEO_RATIO, 10);

    let realTextBoxWidth = Number.parseInt((realManagerWidth * 39.09) / 100, 10);
    if (TEXT_BOX_MAX_WIDTH < realTextBoxWidth) realTextBoxWidth = TEXT_BOX_MAX_WIDTH;
    if (realTextBoxWidth < TEXT_BOX_MIN_WIDTH) realTextBoxWidth = TEXT_BOX_MIN_WIDTH;
    const realTextBoxHeight = Number.parseInt(realTextBoxWidth * TEXT_BOX_RATIO, 10);

    let realStuffListBoxWidth = Number.parseInt((realManagerWidth * 59.09) / 100, 10);
    if (STUFF_LIST_BOX_MAX_WIDTH < realStuffListBoxWidth)
      realStuffListBoxWidth = STUFF_LIST_BOX_MAX_WIDTH;
    if (realStuffListBoxWidth < STUFF_LIST_BOX_MIN_WIDTH)
      realStuffListBoxWidth = STUFF_LIST_BOX_MIN_WIDTH;
    const realStuffBoxListHeight = Number.parseInt(
      realStuffListBoxWidth * STUFF_LIST_BOX_RATIO,
      10,
    );

    this._layoutBox.setSize(realManagerWidth, realManagerHeight);
    this._layoutBox.setPosition(width / 2 - realManagerWidth / 2, TOP_MARGIN);

    this._video.setDisplaySize(realVideoWidth, realVideoHeight);
    this._video.setPosition(
      width / 2 - realManagerWidth / 2 + realVideoWidth / 2,
      TOP_MARGIN + realVideoHeight / 2,
    );

    this._shopInfoTextBox.setSize(realTextBoxWidth, realTextBoxHeight);
    this._shopInfoTextBox.setPosition(
      width / 2 - realManagerWidth / 2,
      TOP_MARGIN + realManagerHeight - realTextBoxHeight,
    );

    this._stuffBox.setSize(realStuffListBoxWidth, realStuffBoxListHeight);
    this._stuffBox.setPosition(
      width / 2 + realManagerWidth / 2 - realStuffListBoxWidth,
      TOP_MARGIN,
    );
  }
}

export default ShopManagerScene;
