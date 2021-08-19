import closeIcon from '@/assets/icon/close-icon.png';
import Phaser from '@/package/phaser';

const CLOSE_ICON_KEY = 'closeIcon';
const PADDING = 50;
const BACKGROUND_COLOR = 0xf2f2f2;
const BACKGROUND_OPACITY = 0.7;
const MODAL_COLOR = 0xffffff;

class ModalScene extends Phaser.Scene {
  preload() {
    this.load.image(CLOSE_ICON_KEY, closeIcon);
  }

  create() {
    const background = this._createBackground();
    this._registerResizeEventHandler(background);

    const modal = this._createModal();
    this._registerResizeEventHandler(modal, PADDING);
  }

  _createBackground() {
    return this.add
      .rectangle(
        0,
        0,
        this.cameras.main.displayWidth,
        this.cameras.main.displayHeight,
        BACKGROUND_COLOR,
        BACKGROUND_OPACITY,
      )
      .setOrigin(0);
  }

  _createModal() {
    const modal = this.add
      .rectangle(
        PADDING,
        PADDING,
        this.cameras.main.displayWidth - 2 * PADDING,
        this.cameras.main.displayHeight - 2 * PADDING,
        MODAL_COLOR,
      )
      .setOrigin(0);

    const closeBtn = this._createCloseBtn();
    this._registerCloseBtnEventHandler(closeBtn);

    Phaser.Display.Align.In.TopLeft(closeBtn, modal);

    return modal;
  }

  _createCloseBtn() {
    const closeBtn = this.add.image(0, 0, CLOSE_ICON_KEY).setOrigin(0).setInteractive();
    return closeBtn;
  }

  _registerCloseBtnEventHandler(closeBtn) {
    const closeModal = () => this.scene.remove(this);

    closeBtn.on('pointerup', closeModal);

    this.events.once('destroy', () => {
      closeBtn.off('pointerup', closeModal);
    });
  }

  _registerResizeEventHandler(gameObject, padding = 0) {
    const resize = gameSize =>
      gameObject.setSize(gameSize.width - 2 * padding, gameSize.height - 2 * padding);

    this.scale.on('resize', resize);

    this.events.once('destroy', () => {
      this.scale.off('resize', resize);
    });
  }
}

export default ModalScene;
