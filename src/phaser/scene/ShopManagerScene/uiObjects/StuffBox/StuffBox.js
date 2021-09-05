import Phaser from '@/package/phaser';

class StuffBox extends Phaser.GameObjects.Container {
  constructor(scene, width, height, stuffs) {
    super(scene);
    this._width = width;
    this._height = height;
    this._stuffs = stuffs;
    this._stuffBoxDom = new Phaser.GameObjects.DOMElement(scene).createFromHTML(`<div></div>`);

    this.add(this._stuffBoxDom);
    this.setSize(width, height);

    scene.add.existing(this);

    this._registerEventHandler();
  }

  _registerEventHandler() {
    throw new Error('Implements _registerEventHandler method');
  }

  _setHTML(html) {
    this._stuffBoxDom.setHTML(html);
  }
}

export default StuffBox;
