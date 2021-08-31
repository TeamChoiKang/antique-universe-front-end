import Stuff from '@/model/Stuff';
import Phaser from '@/package/phaser';
import * as sceneKeys from '@/phaser/scene/sceneKeys';
import StuffList from '@/phaser/scene/ShopManagerScene/uiObjects/StuffList';
import TextBox from '@/phaser/scene/ShopManagerScene/uiObjects/TextBox';
import Video from '@/phaser/scene/ShopManagerScene/uiObjects/Video';

const MANAGER_WIDTH = 1650;
const MANAGER_HEIGHT = 680;

const VIDEO_KEY = 'camVideo';
const VIDEO_WIDTH = 660;
const VIDEO_HEIGHT = 371;

const TEXT_BOX_WIDTH = 660;
const TEXT_BOX_HEIGHT = 309;
const TEXT_BOX_COLOR = 0x3498db;
const TEXT_BOX_CONTENTS =
  '어서오세요 KangJi 상점입니다.\n\n택배, 직거래 가능합니다.\n\n직거래는 공릉역에서 가능합니다.';

const STUFF_LIST_BOX_WIDTH = 990;
const STUFF_LIST_BOX_HEIGHT = 680;
const STUFF_LIST_BOX_STUFFS = [
  new Stuff(
    '닌텐도 스위치',
    '200,000',
    'https://user-images.githubusercontent.com/22635168/131383457-16e07863-6156-4b6b-ab9c-45a0795ccf37.jpg',
  ),
  new Stuff(
    '스타십',
    '700,000,000',
    'https://user-images.githubusercontent.com/22635168/131383580-2df68cad-fdbb-42a3-ba79-d1e40a8ae883.jpg',
  ),
  new Stuff(
    '사과폰',
    '666,000',
    'https://user-images.githubusercontent.com/22635168/131383661-fa82841f-f691-4f55-87f8-edbf993f01f4.jpg',
  ),
  new Stuff(
    '큐브관',
    '8,000,000,000',
    'https://user-images.githubusercontent.com/22635168/131383705-ad0adec8-6f5b-4741-87df-431feac674c4.jpg',
  ),
  new Stuff(
    'Oatly',
    '4,700',
    'https://user-images.githubusercontent.com/22635168/131383737-d6cbe8a8-05fb-4dc8-ada7-00aa81de0b97.jpg',
  ),
  new Stuff(
    '머스크',
    '200 DOGE',
    'https://user-images.githubusercontent.com/22635168/131383768-2497dd04-fdea-4584-aef8-a95f712f2688.jpg',
  ),
];

class ShopManagerScene extends Phaser.Scene {
  constructor(shopScene) {
    super(sceneKeys.SHOP_MANAGER_SCENE_KEY);
    this.shopScene = shopScene;
  }

  preload() {
    this.load.setCORS('*');
    this.load.video(VIDEO_KEY, 'https://labs.phaser.io/assets/video/wormhole.mp4');
  }

  create() {
    this._registerShutdownEventHandler();

    const layoutZone = this._createLayoutZone();

    const video = new Video(this, VIDEO_KEY, VIDEO_WIDTH, VIDEO_HEIGHT);
    video.play(true);

    const shopInfoTextBox = new TextBox(
      this,
      TEXT_BOX_WIDTH,
      TEXT_BOX_HEIGHT,
      TEXT_BOX_COLOR,
      TEXT_BOX_CONTENTS,
    );

    const stuffList = new StuffList(
      this,
      STUFF_LIST_BOX_WIDTH,
      STUFF_LIST_BOX_HEIGHT,
      STUFF_LIST_BOX_STUFFS,
    );

    Phaser.Display.Align.In.TopLeft(video, layoutZone);
    Phaser.Display.Align.In.BottomLeft(shopInfoTextBox, layoutZone);
    Phaser.Display.Align.In.RightCenter(stuffList, layoutZone);
  }

  _createLayoutZone() {
    const leftMargin =
      this.cameras.main.width > MANAGER_WIDTH ? (this.cameras.main.width - MANAGER_WIDTH) / 2 : 0;
    const topMargin = this.cameras.main.height > MANAGER_HEIGHT ? 20 : 0;

    const background = this.add
      .zone(leftMargin, topMargin, MANAGER_WIDTH, MANAGER_HEIGHT)
      .setOrigin(0);

    return background;
  }

  _registerShutdownEventHandler() {
    this.shopScene.events.once('shutdown', () => {
      this.scene.remove(this);
    });
  }
}

export default ShopManagerScene;
