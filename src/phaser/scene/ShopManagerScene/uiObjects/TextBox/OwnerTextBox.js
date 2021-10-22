import DomBox from '@/phaser/scene/ShopManagerScene/uiObjects/DomBox';
import SocketManager from '@/utils/socket/SocketManager';

const TEXT_BOX_RATIO = 0.418;

class OwnerTextBox extends DomBox {
  constructor(scene, color = `ffffff`, width = 0, height = 0) {
    super(scene, `text-box-dom-wrapper`, width, height);

    const socket = new SocketManager();

    socket.emit('shopInfo:getDescription');

    socket.on('shopInfo:getDescription', description => {
      this.setContents(description);
    });

    this.addListener('click');

    this.on('click', event => {
      if (event.action === 'updateShopDescription') {
        const shopDescription = this.getChildByName('shopDescription').value;
        socket.emit('shopInfo:setDescription', shopDescription);
        this.setContents(shopDescription);
      }
    });

    this.on('destroy', () => socket.removeAllListeners());
  }

  setContents(contents) {
    const html = `
      <div class="text-box">
        <textarea placeholder="가게 설명" name="shopDescription">${contents}</textarea>
        <div class="text-box__submit-btn-wrapper">
          <input
            type="submit"
            value="가게 설명 업데이트하기"
            name="shopDescriptionBtn"
            onclick="(() => {
              event.action='updateShopDescription';
            })()"
          />
        </div>
      </div>
      <style>
        .text-box {
          width: 100%;
          height: 100%;
        }
        .text-box > textarea {
          resize: none;
          width: 100%;
          height: 83%;
          padding: 0;
          margine: 0;
        }
        .text-box__submit-btn-wrapper {
          height: 15%;
        }
        .text-box__submit-btn-wrapper > input {
          width: 100%;
          height: 100%;
        }
      </style>
    `;
    this._setHTML(html);
  }

  setSizeWithFixedRatio(width) {
    this.setSize(width, Number.parseInt(width * TEXT_BOX_RATIO, 10));
  }
}

export default OwnerTextBox;
