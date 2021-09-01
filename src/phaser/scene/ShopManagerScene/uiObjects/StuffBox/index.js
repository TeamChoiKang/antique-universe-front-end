import Phaser from '@/package/phaser';

import * as htmlCreator from './htmlCreator';

class StuffBox extends Phaser.GameObjects.Container {
  constructor(scene, width, height, stuffs) {
    super(scene, 0, 0);
    this._stuffListHtml = scene.add
      .dom()
      .createFromHTML(htmlCreator.createStuffListHtml(width, height, stuffs));

    this.add(this._stuffListHtml);
    this.setSize(width, height);

    scene.add.existing(this);
  }
}

export default StuffBox;
