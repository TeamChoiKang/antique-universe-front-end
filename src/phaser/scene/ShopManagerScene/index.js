import Stuff from '@/model/Stuff';
import Phaser from '@/package/phaser';

import * as htmlHelper from './htmlHelper';

const MANAGER_WIDTH = 1650;
const MANAGER_HEIGHT = 680;
const MANAGER_BACKGROUND_COLOR = 0xffffff;

const LEFT_SECTION_WIDTH = 660;
const RIGHT_SECTION_WIDTH = 990;

class ShopManagerScene extends Phaser.Scene {
  constructor(shopScene) {
    super();
    this.shopScene = shopScene;
  }

  preload() {}

  create() {
    this._registerShutdownEventHandler();
    const background = this._createBackground();
    const leftSection = this._createLeftSection(background);
    const rightSection = this._createRightSection(background);
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

  _createLeftSection(parents) {
    const leftSectionObject = this.add
      .rectangle(0, 0, LEFT_SECTION_WIDTH, MANAGER_HEIGHT, 0xff0000, 0.5)
      .setInteractive();

    Phaser.Display.Align.In.LeftCenter(leftSectionObject, parents);

    return leftSectionObject;
  }

  _createRightSection(parents) {
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

    const rightSectionObject = this.add.dom().createFromHTML(html);

    Phaser.Display.Align.In.RightCenter(rightSectionObject, parents);

    return rightSectionObject;
  }

  _registerShutdownEventHandler() {
    this.shopScene.events.once('shutdown', () => {
      this.scene.remove(this);
    });
  }
}

export default ShopManagerScene;
