import Stuff from '@/model/Stuff';
import StuffBox from '@/phaser/scene/ShopManagerScene/uiObjects/StuffBox/StuffBox';
import SocketManager from '@/utils/socket/SocketManager';

import * as action from './action';
import * as htmlCreator from './htmlCreator';

class AdminStuffBox extends StuffBox {
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
      this._setHTML(htmlCreator.createShopAdminStuffListHtml(this._stuffs));
    });

    this._socket.on('shopStuff:appendStuff', () => this._socket.emit('shopStuff:getStuffs'));

    this._socket.on('shopStuff:updateStuff', () => this._socket.emit('shopStuff:getStuffs'));

    this._socket.on('shopStuff:removeStuff', () => this._socket.emit('shopStuff:getStuffs'));

    this.on('destroy', () => this._socket.removeAllListeners());

    this._socket.emit('shopStuff:getStuffs');
  }

  _registerEventHandler() {
    this.addListener('click');

    this.on('click', event => {
      if (event.action === action.CHANGE_TO_STUFF_INFO_HTML) {
        const targetStuff = this._findStuff(event.stuffId);
        this._setHTML(htmlCreator.createShopAdminStuffInfoHtml(targetStuff));
      }

      if (event.action === action.CHANGE_TO_STUFF_LIST_HTML) {
        this._socket.emit('shopStuff:getStuffs');
      }

      if (event.action === action.CHANGE_TO_ADD_STUFF_HTML) {
        this._setHTML(htmlCreator.createAddStuffHtml());
      }

      if (event.action === action.CHANGE_TO_UPDATE_STUFF_HTML) {
        const targetStuff = this._findStuff(event.stuffId);
        this._setHTML(htmlCreator.createUpdateStuffHtml(targetStuff));
      }

      if (event.action === action.REMOVE_STUFF) {
        this._socket.emit('shopStuff:removeStuff', event.stuffId);
      }

      if (event.action === action.ADD_STUFF) {
        const stuffImage = this.getChildByName('stuffImage').files[0];
        const stuffName = this.getChildByName('stuffName').value;
        const stuffPrice = this.getChildByName('stuffPrice').value;
        const stuffOnlyAdult = this.getChildByName('stuffOnlyAdult').checked;
        const stuffDescription = this.getChildByName('stuffDescription').value;

        if (stuffName && stuffPrice && stuffDescription) {
          this._socket.emit('shopStuff:appendStuff', {
            name: stuffName,
            price: stuffPrice,
            description: stuffDescription,
            imageUrl: stuffImage,
            soldState: false,
            onlyAdult: stuffOnlyAdult,
          });
        }
      }

      if (event.action === action.UPDATE_STUFF) {
        const stuffImage = this.getChildByName('stuffImage').files[0];
        const stuffName = this.getChildByName('stuffName').value;
        const stuffPrice = this.getChildByName('stuffPrice').value;
        const stuffOnlyAdult = this.getChildByName('stuffOnlyAdult').checked;
        const stuffDescription = this.getChildByName('stuffDescription').value;

        if (stuffName && stuffPrice && stuffDescription) {
          this._socket.emit('shopStuff:updateStuff', {
            stuffId: event.stuffId,
            name: stuffName,
            price: stuffPrice,
            description: stuffDescription,
            imageUrl: stuffImage,
            soldState: false,
            onlyAdult: stuffOnlyAdult,
          });
        }
      }
    });
  }
}

export default AdminStuffBox;
