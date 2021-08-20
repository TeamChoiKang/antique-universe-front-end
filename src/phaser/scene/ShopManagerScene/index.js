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
    const rightSectionObject = this.add
      .rectangle(0, 0, RIGHT_SECTION_WIDTH, MANAGER_HEIGHT, 0x00ff00, 0.5)
      .setInteractive();

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
