import Stuff from '@/model/Stuff';
import StuffBox from '@/phaser/scene/ShopManagerScene/uiObjects/StuffBox/StuffBox';
import SocketManager from '@/utils/socket/SocketManager';

import * as action from './action';
import * as htmlCreator from './htmlCreator';

class NormalStuffBox extends StuffBox {
  constructor(scene, width = 0, height = 0) {
    super(scene, width, height);

    this._socket = new SocketManager();

    this._socket.on('shopStuff:getStuffs', stuffs => {
      const newStuffs = [];

      stuffs.forEach(stuffInfo =>
        newStuffs.push(
          new Stuff(
            stuffInfo.stuffId,
            stuffInfo.name,
            stuffInfo.price,
            stuffInfo.imageUrl,
            stuffInfo.description,
            stuffInfo.soldState,
            stuffInfo.onlyAdult,
          ),
        ),
      );

      this._setStuffs(newStuffs);
      this._setHTML(htmlCreator.createStuffListHtml(this._stuffs));
    });

    this._socket.emit('shopStuff:getStuffs');

    this.on('destroy', () => this._socket.removeAllListeners());
  }

  _registerEventHandler() {
    this.addListener('click');

    this.on('click', event => {
      if (event.action === action.CHANGE_TO_STUFF_INFO_HTML) {
        const targetStuff = this._findStuff(event.stuffId);
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
