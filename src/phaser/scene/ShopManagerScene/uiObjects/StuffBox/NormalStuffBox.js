import StuffBox from '@/phaser/scene/ShopManagerScene/uiObjects/StuffBox/StuffBox';

import * as action from './action';
import * as htmlCreator from './htmlCreator';

class NormalStuffBox extends StuffBox {
  constructor(scene, width, height, stuffs) {
    super(scene, width, height, stuffs);
    this._setHTML(htmlCreator.createStuffListHtml(this._stuffs));
  }

  _registerEventHandler() {
    this._stuffBoxDom.addListener('click');

    this._stuffBoxDom.on('click', event => {
      if (event.action === action.CHANGE_TO_STUFF_INFO_HTML) {
        const targetStuff = this._stuffs.find(v => v.getStuffId() === event.stuffId);
        const stuffInfoHtml = htmlCreator.createStuffInfoHtml(targetStuff);

        this._setHTML(stuffInfoHtml);
      }

      if (event.action === action.CHANGE_TO_STUFF_LIST_HTML) {
        this._setHTML(htmlCreator.createStuffListHtml(this._stuffs));
      }
    });
  }
}

export default NormalStuffBox;
