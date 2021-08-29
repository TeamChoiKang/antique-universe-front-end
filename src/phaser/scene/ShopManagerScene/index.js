import Stuff from '@/model/Stuff';
import Phaser from '@/package/phaser';

import * as htmlHelper from './htmlHelper';

const MANAGER_WIDTH = 1650;
const MANAGER_HEIGHT = 680;
const MANAGER_BACKGROUND_COLOR = 0xffffff;

const VIDEO_KEY = 'camVideo';
const VIDEO_WIDTH = 660;
const VIDEO_HEIGHT = 371;

const TEXT_BOX_WIDTH = 660;
const TEXT_BOX_HEIGHT = 309;
const TEXT_BOX_COLOR = 0x3498db;

class ShopManagerScene extends Phaser.Scene {
  constructor(shopScene) {
    super();
    this.shopScene = shopScene;
  }

  preload() {
    this.load.setCORS('*');
    this.load.video(VIDEO_KEY, 'https://labs.phaser.io/assets/video/wormhole.mp4');
  }

  create() {
    this._registerShutdownEventHandler();

    const background = this._createBackground();
    const video = this._createVideo();
    const shopInfoTextBox = this._createShopInfoTextBox();
    const stuffListDom = this._createStuffListDom();

    Phaser.Display.Align.In.TopLeft(video, background);
    Phaser.Display.Align.In.BottomLeft(shopInfoTextBox, background);
    Phaser.Display.Align.In.RightCenter(stuffListDom, background);

    const text = this.add.text(
      0,
      0,
      '어서오세요 KangJi 상점입니다.\n\n택배, 직거래 가능합니다.\n\n직거래는 공릉역에서 가능합니다.',
    );

    Phaser.Display.Align.In.Center(text, shopInfoTextBox);
  }

  _createBackground() {
    const leftMargin =
      this.cameras.main.width > MANAGER_WIDTH ? (this.cameras.main.width - MANAGER_WIDTH) / 2 : 0;
    const topMargin = this.cameras.main.height > MANAGER_HEIGHT ? 20 : 0;

    const background = this.add
      .rectangle(leftMargin, topMargin, MANAGER_WIDTH, MANAGER_HEIGHT, MANAGER_BACKGROUND_COLOR)
      .setOrigin(0);
    return background;
  }

  _createVideo() {
    const vidoeSection = this.add.video(0, 0, VIDEO_KEY);
    vidoeSection.setDisplaySize(VIDEO_WIDTH, VIDEO_HEIGHT).setOrigin(0);

    vidoeSection.play(true);

    return vidoeSection;
  }

  _createShopInfoTextBox() {
    const textBox = this.add
      .rectangle(0, 0, TEXT_BOX_WIDTH, TEXT_BOX_HEIGHT, TEXT_BOX_COLOR)
      .setOrigin(0);

    return textBox;
  }

  _createStuffListDom() {
    const stuffList = [];

    stuffList.push(
      new Stuff(
        '닌텐도 스위치',
        '200,000',
        'https://www.costco.co.kr/medias/sys_master/images/h34/h1c/26735613542430.jpg',
      ),
      new Stuff(
        '스타십',
        '700,000,000',
        'https://img.hani.co.kr/imgdb/resize/2019/0112/00501076_20190112.JPG',
      ),
      new Stuff('사과폰', '666,000', 'https://newsimg.sedaily.com/2020/10/01/1Z8YNMADIC_1.jpg'),
      new Stuff(
        '큐브관',
        '8,000,000,000',
        'https://cdn.news.unn.net/news/photo/202012/501682_301771_4513.jpg',
      ),
      new Stuff(
        'Oatly',
        '4,700',
        'https://dailytrend.storage.googleapis.com/wp-content/uploads/2021/07/22102048/OatlyOatMilk_Lead.jpg',
      ),
      new Stuff(
        '머스크',
        '200 DOGE',
        'https://image.imnews.imbc.com/news/2021/world/article/__icsFiles/afieldfile/2021/05/17/p20210517_23.jpg',
      ),
    );

    const html = htmlHelper.createStuffListHtml(stuffList);

    const stuffListDom = this.add.dom().createFromHTML(html);

    return stuffListDom;
  }

  _registerShutdownEventHandler() {
    this.shopScene.events.once('shutdown', () => {
      this.scene.remove(this);
    });
  }
}

export default ShopManagerScene;
