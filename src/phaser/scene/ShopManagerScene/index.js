import Phaser from '@/package/phaser';

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
    const html = `<div class="stuff-list__main">
                    <div class="stuff-list__stuff">
                      <div class="stuff-list__stuff-img">
                        <img
                          src="https://www.costco.co.kr/medias/sys_master/images/h34/h1c/26735613542430.jpg"
                        />
                      </div>
                      <div class="stuff-list__stuff-info">
                        <div class="stuff-list__stuff-name">닌텐도 스위치</div>
                        <div class="stuff-list__stuff-price">200,000</div>
                      </div>
                    </div>
                    <div class="stuff-list__stuff">
                      <div class="stuff-list__stuff-img">
                        <img
                          src="https://img.hani.co.kr/imgdb/resize/2019/0112/00501076_20190112.JPG"
                        />
                      </div>
                      <div class="stuff-list__stuff-info">
                        <div class="stuff-list__stuff-name">스타십</div>
                        <div class="stuff-list__stuff-price">700,000,000</div>
                      </div>
                    </div>
                    <div class="stuff-list__stuff">
                      <div class="stuff-list__stuff-img">
                        <img src="https://newsimg.sedaily.com/2020/10/01/1Z8YNMADIC_1.jpg" />
                      </div>
                      <div class="stuff-list__stuff-info">
                        <div class="stuff-list__stuff-name">사과폰</div>
                        <div class="stuff-list__stuff-price">666,000</div>
                      </div>
                    </div>
                    <div class="stuff-list__stuff">
                      <div class="stuff-list__stuff-img">
                        <img
                          src="https://cdn.news.unn.net/news/photo/202012/501682_301771_4513.jpg"
                        />
                      </div>
                      <div class="stuff-list__stuff-info">
                        <div class="stuff-list__stuff-name">큐브관</div>
                        <div class="stuff-list__stuff-price">8,000,000,000</div>
                      </div>
                    </div>
                    <div class="stuff-list__stuff">
                      <div class="stuff-list__stuff-img">
                        <img
                          src="https://dailytrend.storage.googleapis.com/wp-content/uploads/2021/07/22102048/OatlyOatMilk_Lead.jpg"
                        />
                      </div>
                      <div class="stuff-list__stuff-info">
                        <div class="stuff-list__stuff-name">Oatly</div>
                        <div class="stuff-list__stuff-price">4,700</div>
                      </div>
                    </div>
                    <div class="stuff-list__stuff">
                      <div class="stuff-list__stuff-img">
                        <img
                          src="https://image.imnews.imbc.com/news/2021/world/article/__icsFiles/afieldfile/2021/05/17/p20210517_23.jpg"
                        />
                      </div>
                      <div class="stuff-list__stuff-info">
                        <div class="stuff-list__stuff-name">머스크</div>
                        <div class="stuff-list__stuff-price">200 DOGE</div>
                      </div>
                    </div>
                  </div>
                  <style type="text/css">
                    .stuff-list__main {
                      width: ${RIGHT_SECTION_WIDTH}px;
                      height: ${MANAGER_HEIGHT}px;
                      display: flex;
                      flex-wrap: wrap;
                      overflow-y: scroll;
                    }
                    
                    .stuff-list__stuff {
                      width: 480px;
                      height: 340px;
                    }

                    .stuff-list__stuff-img {
                      width: 100%;
                      height: 300px;
                      padding-top: 10px;
                      padding-bottom: 10px;
                      text-align: center;
                    }
                    
                    .stuff-list__stuff-img > img {
                      width: 450px;
                      height: 300px;
                    }

                    .stuff-list__stuff-info {
                      width: 100%;
                      display: flex;
                      justify-content: space-between;
                    }

                    .stuff-list__stuff-name {
                      padding-left: 22px;
                    }
                    
                    .stuff-list__stuff-price {
                      padding-right: 22px;
                    }
                  </style>
                  `;

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
