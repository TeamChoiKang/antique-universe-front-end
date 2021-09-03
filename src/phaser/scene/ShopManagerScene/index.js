import Stuff from '@/model/Stuff';
import Phaser from '@/package/phaser';
import * as sceneKeys from '@/phaser/scene/sceneKeys';
import LayoutBox from '@/phaser/scene/ShopManagerScene/uiObjects/LayoutBox';
import StuffBox from '@/phaser/scene/ShopManagerScene/uiObjects/StuffBox';
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
    0,
    '닌텐도 스위치',
    '200,000',
    'https://user-images.githubusercontent.com/22635168/131383457-16e07863-6156-4b6b-ab9c-45a0795ccf37.jpg',
    `짱짱 스위치 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
    false,
    false,
  ),
  new Stuff(
    1,
    '스타십',
    '700,000,000',
    'https://user-images.githubusercontent.com/22635168/131383580-2df68cad-fdbb-42a3-ba79-d1e40a8ae883.jpg',
    `우주선~ Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.`,
    false,
    false,
  ),
  new Stuff(
    2,
    '사과폰',
    '666,000',
    'https://user-images.githubusercontent.com/22635168/131383661-fa82841f-f691-4f55-87f8-edbf993f01f4.jpg',
    `시총 3000조 회사 핸드폰 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    false,
    false,
  ),
  new Stuff(
    3,
    '큐브관',
    '8,000,000,000',
    'https://user-images.githubusercontent.com/22635168/131383705-ad0adec8-6f5b-4741-87df-431feac674c4.jpg',
    `과기머 예쁜 건물 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`,
    false,
    false,
  ),
  new Stuff(
    4,
    'Oatly',
    '4,700',
    'https://user-images.githubusercontent.com/22635168/131383737-d6cbe8a8-05fb-4dc8-ada7-00aa81de0b97.jpg',
    `요즘 유행하는 귀리 우유 It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    false,
    false,
  ),
  new Stuff(
    5,
    '머스크',
    '200 DOGE',
    'https://user-images.githubusercontent.com/22635168/131383768-2497dd04-fdea-4584-aef8-a95f712f2688.jpg',
    `천재 There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form`,
    false,
    false,
  ),
];

class ShopManagerScene extends Phaser.Scene {
  constructor(shopScene) {
    super(sceneKeys.SHOP_MANAGER_SCENE_KEY);

    this._shopScene = shopScene;
    this._layoutZone = undefined;
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
    this._registerShutdownEventHandler();

    const leftMargin =
      this.cameras.main.width > MANAGER_WIDTH ? (this.cameras.main.width - MANAGER_WIDTH) / 2 : 0;
    const topMargin = this.cameras.main.height > MANAGER_HEIGHT ? 20 : 0;
    this._layoutZone.setPosition(leftMargin, topMargin);

    this._video.play(true);
    Phaser.Display.Align.In.TopLeft(this._video, this._layoutZone);
    Phaser.Display.Align.In.BottomLeft(this._shopInfoTextBox, this._layoutZone);
    Phaser.Display.Align.In.RightCenter(this._stuffBox, this._layoutZone);
  }

  _registerShutdownEventHandler() {
    this._shopScene.events.once('shutdown', () => {
      this.scene.remove(this);
    });
  }

  _initChildGameObject() {
    this._layoutZone = new LayoutBox(this, 0, 0, MANAGER_WIDTH, MANAGER_HEIGHT);
    this._video = new Video(this, VIDEO_KEY, VIDEO_WIDTH, VIDEO_HEIGHT);
    this._shopInfoTextBox = new TextBox(
      this,
      TEXT_BOX_WIDTH,
      TEXT_BOX_HEIGHT,
      TEXT_BOX_COLOR,
      TEXT_BOX_CONTENTS,
    );
    this._stuffBox = new StuffBox(
      this,
      STUFF_LIST_BOX_WIDTH,
      STUFF_LIST_BOX_HEIGHT,
      STUFF_LIST_BOX_STUFFS,
    );
  }
}

export default ShopManagerScene;
