import Phaser from '@/package/phaser';

import * as htmlCreator from './htmlCreator';

class StuffBox extends Phaser.GameObjects.Container {
  constructor(scene, width, height, stuffs) {
    super(scene, 0, 0);
    this._stuffs = stuffs;
    this._stuffListHtml = scene.add
      .dom()
      .createFromHTML(htmlCreator.createStuffListHtml(width, height, stuffs));

    this.add(this._stuffListHtml);
    this.setSize(width, height);

    scene.add.existing(this);

    this._registerEventHandler();
  }

  _registerEventHandler() {
    this._stuffListHtml.addListener('click');

    this._stuffListHtml.on('click', event => {
      console.log(event);
    });

    this.add(this._stuffListHtml);
  }
}

export default StuffBox;
