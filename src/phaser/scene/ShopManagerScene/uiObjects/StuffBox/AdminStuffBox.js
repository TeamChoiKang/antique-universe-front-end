import StuffBox from '@/phaser/scene/ShopManagerScene/uiObjects/StuffBox/StuffBox';

import * as action from './action';
import * as htmlCreator from './htmlCreator';

class AdminStuffBox extends StuffBox {
  constructor(scene, width, height, stuffs) {
    super(scene, width, height, stuffs);
    this._setHTML(htmlCreator.createShopAdminStuffListHtml(this._stuffs));
  }

  _registerEventHandler() {
    this._stuffBoxDom.addListener('click');

    this._stuffBoxDom.on('click', event => {
      if (event.action === action.CHANGE_TO_STUFF_INFO_HTML) {
        const targetStuff = this._stuffs.find(v => v.getStuffId() === event.stuffId);

        this._setHTML(htmlCreator.createStuffInfoHtml(targetStuff));
      }

      if (event.action === action.CHANGE_TO_STUFF_LIST_HTML) {
        this._setHTML(htmlCreator.createShopAdminStuffListHtml(this._stuffs));
      }

      if (event.action === action.CHANGE_TO_ADD_STUFF_HTML) {
        this._setHTML(htmlCreator.createAddStuffHtml());
      }

      if (event.action === action.ADD_STUFF) {
        const stuffImage = this._stuffBoxDom.getChildByName('stuffImage').files[0];
        const stuffName = this._stuffBoxDom.getChildByName('stuffName').value;
        const stuffPrice = this._stuffBoxDom.getChildByName('stuffPrice').value;
        const stuffOnlyAdult = this._stuffBoxDom.getChildByName('stuffOnlyAdult').checked;
        const stuffDescription = this._stuffBoxDom.getChildByName('stuffDescription').value;

        if (stuffImage && stuffName && stuffPrice && stuffDescription) {
          this._setHTML(htmlCreator.createShopAdminStuffListHtml(this._stuffs));
        }
      }
    });
  }
}

export default AdminStuffBox;
