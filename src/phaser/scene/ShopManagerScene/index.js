import Phaser from '@/package/phaser';

const MANAGER_WIDTH = 1650;
const MANAGER_HEIGHT = 680;
const MANAGER_BACKGROUND_COLOR = 0xffffff;

class ShopManagerScene extends Phaser.Scene {
  constructor(shopScene) {
    super();
    this.shopScene = shopScene;
  }

  preload() {}

  create() {
    this._registerShutdownEventHandler();
    const background = this._createBackground();
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

  _registerShutdownEventHandler() {
    this.shopScene.events.once('shutdown', () => {
      this.scene.remove(this);
    });
  }
}

export default ShopManagerScene;
