import Phaser from '@/package/phaser';

class StuffBox extends Phaser.GameObjects.DOMElement {
  constructor(scene, stuffs, width = 0, height = 0) {
    super(scene).createFromHTML(
      `<div
        id="stuff-dom-wrapper"
        style="width: ${width}px; height: ${height}px;"
      ></div>
      <style type="text/css">
        #stuff-dom-wrapper {
          overflow-y: scroll;
          background: white;
        }
      </style>`,
    );

    this._domWrapper = this.getChildByID(`stuff-dom-wrapper`);
    this._stuffs = stuffs;

    scene.add.existing(this);

    this._registerEventHandler();
  }

  _registerEventHandler() {
    throw new Error('Implements _registerEventHandler method');
  }

  _clearHTML() {
    while (this._domWrapper.firstChild) this._domWrapper.removeChild(this._domWrapper.lastChild);
  }

  _setHTML(html) {
    this._clearHTML();
    this._domWrapper.insertAdjacentHTML('beforeend', html);
  }

  setSize(width, height) {
    this._domWrapper.style.width = `${width}px`;
    this._domWrapper.style.height = `${height}px`;
  }
}

export default StuffBox;
