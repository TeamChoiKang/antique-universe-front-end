import Phaser from '@/package/phaser';

import * as action from './action';
import * as htmlCreator from './htmlCreator';

class StuffBox extends Phaser.GameObjects.Container {
  constructor(scene, width, height, stuffs) {
    super(scene);
    this._width = width;
    this._height = height;
    this._stuffs = stuffs;
    this._stuffListHtml = htmlCreator.createShopAdminStuffListHtml(width, height, stuffs);
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
      if (event.action === action.CHANGE_TO_STUFF_INFO_HTML) {
        const targetStuff = this._stuffs.find(v => v.getStuffId() === event.stuffId);
        const stuffInfoHtml = htmlCreator.createStuffInfoHtml(
          this._width,
          this._height,
          targetStuff,
        );

        this._stuffBoxDom.setHTML(stuffInfoHtml);
      }

      if (event.action === action.CHANGE_TO_STUFF_LIST_HTML) {
        this._stuffBoxDom.setHTML(this._stuffListHtml);
      }

      if (event.action === action.CHANGE_TO_ADD_STUFF_HTML) {
        this._stuffBoxDom.setHTML(htmlCreator.createAddStuffHtml(this._width, this._height));
      }

      if (event.action === action.ADD_STUFF) {
        const stuffImage = this._stuffBoxDom.getChildByName('stuffImage').files[0];
        const stuffName = this._stuffBoxDom.getChildByName('stuffName').value;
        const stuffPrice = this._stuffBoxDom.getChildByName('stuffPrice').value;
        const stuffOnlyAdult = this._stuffBoxDom.getChildByName('stuffOnlyAdult').checked;
        const stuffDescription = this._stuffBoxDom.getChildByName('stuffDescription').value;

        if (stuffImage && stuffName && stuffPrice && stuffDescription) {
          this._stuffBoxDom.setHTML(this._stuffListHtml);
        }
      }
    });
  }
}

export default StuffBox;
