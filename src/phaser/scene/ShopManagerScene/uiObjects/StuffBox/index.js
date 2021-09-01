import Phaser from '@/package/phaser';

import * as htmlCreator from './htmlCreator';

class StuffBox extends Phaser.GameObjects.Container {
  constructor(scene, width, height, stuffs) {
    super(scene, 0, 0);
    this._width = width;
    this.height = height;
    this._stuffs = stuffs;
    this._stuffListHtml = htmlCreator.createStuffListHtml(width, height, stuffs);
    this._stuffBoxDom = new Phaser.GameObjects.DOMElement(scene).createFromHTML(`<div></div>`);

    this._stuffBoxDom.setHTML(this._stuffListHtml);

    this.add(this._stuffBoxDom);
    this.setSize(width, height);

    scene.add.existing(this);

    this._registerEventHandler();
  }

  _registerEventHandler() {
    this._stuffBoxDom.addListener('click');

    this._stuffBoxDom.on('click', event => {
      if (event.action === 'showInfo') {
        const targetStuff = this._stuffs.find(v => v.getStuffId() === event.stuffId);
        const stuffInfoHtml = htmlCreator.createStuffInfoHtml(
          this._width,
          this._height,
          targetStuff,
        );

        this._stuffBoxDom.setHTML(stuffInfoHtml);
      }
    });
  }
}

export default StuffBox;
