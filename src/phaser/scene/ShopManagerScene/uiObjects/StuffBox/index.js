import { Actions } from 'phaser';

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
      if (event.action === action.SHOW_STUFF_INFO) {
        const targetStuff = this._stuffs.find(v => v.getStuffId() === event.stuffId);
        const stuffInfoHtml = htmlCreator.createStuffInfoHtml(
          this._width,
          this._height,
          targetStuff,
        );

        this._stuffBoxDom.setHTML(stuffInfoHtml);
      }

      if (event.action === action.BACK_TO_STUFF_LIST) {
        this._stuffBoxDom.setHTML(this._stuffListHtml);
      }

      if (event.action === action.CHANGE_TO_ADD_STUFF_HTML) {
        // TODO
      }
    });
  }
}

export default StuffBox;
