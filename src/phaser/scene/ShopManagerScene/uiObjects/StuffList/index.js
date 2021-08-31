import Phaser from '@/package/phaser';

import * as htmlHelper from './htmlManager';

class StuffList extends Phaser.GameObjects.DOMElement {
  constructor(scene, width, height, stuffs) {
    super(scene);
    this.createFromHTML(htmlHelper.createStuffListHtml(width, height, stuffs));

    scene.add.existing(this);
  }
}

export default StuffList;
