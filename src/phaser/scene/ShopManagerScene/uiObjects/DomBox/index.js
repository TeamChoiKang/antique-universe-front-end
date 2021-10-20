import Phaser from '@/package/phaser';

class TextBox extends Phaser.GameObjects.DOMElement {
  constructor(scene, domWrapperId, width = 0, height = 0) {
    super(scene).createFromHTML(
      `<div
        id="${domWrapperId}"
        style="width: ${width}px; height: ${height}px;"
      ></div>
      <style type="text/css">
        #${domWrapperId}::-webkit-scrollbar {
          display: none;
        }

        #${domWrapperId} {
          overflow-y: scroll;
        }
      </style>`,
    );

    this._domWrapper = this.getChildByID(`${domWrapperId}`);
    this.width = width;
    this.height = height;

    this._domWrapper.addEventListener('keydown', event => event.stopImmediatePropagation());

    scene.add.existing(this);
  }

  _clearHTML() {
    while (this._domWrapper.firstChild) this._domWrapper.removeChild(this._domWrapper.lastChild);
  }

  _setHTML(html) {
    this._clearHTML();
    this._domWrapper.insertAdjacentHTML('beforeend', html);
  }

  setBackgroundColor(hexColorString) {
    this._domWrapper.style.background = `#${hexColorString}`;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;

    this._domWrapper.style.width = `${width}px`;
    this._domWrapper.style.height = `${height}px`;
  }
}

export default TextBox;
