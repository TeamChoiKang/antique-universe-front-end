import DomBox from '@/phaser/scene/ShopManagerScene/uiObjects/DomBox';
import SocketManager from '@/utils/socket/SocketManager';

const TEXT_BOX_RATIO = 0.418;

class VisitorTextBox extends DomBox {
  constructor(scene, color = `ffffff`, width = 0, height = 0) {
    super(scene, `text-box-dom-wrapper`, width, height);
    this.setBackgroundColor(color);

    const socket = new SocketManager();

    socket.emit('shopInfo:getDescription');

    socket.on('shopInfo:getDescription', description => {
      this.setContents(description);
    });

    this.on('destroy', () => socket.removeAllListeners());
  }

  setContents(contents) {
    const html = `
      <div class="text-box">
        ${contents}
      </div>
      <style>
        .text-box {
          text-align: center;
          font-size: 1.5rem;
          color: white;
          line-height: 2;
          padding-left: 10px;
          padding-right: 10px;
        }
      </style>
    `;
    this._setHTML(html);
  }

  setSizeWithFixedRatio(width) {
    this.setSize(width, Number.parseInt(width * TEXT_BOX_RATIO, 10));
  }
}

export default VisitorTextBox;
