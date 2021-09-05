import Phaser from '@/package/phaser';

class StuffBox extends Phaser.GameObjects.Container {
  constructor(scene, width, height, stuffs) {
    super(scene);
    this._width = width;
    this._height = height;
    this._stuffs = stuffs;
    this._stuffBoxDom = new Phaser.GameObjects.DOMElement(scene).createFromHTML(
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

    this.add(this._stuffBoxDom);
    super.setSize(width, height);

    scene.add.existing(this);

    this._registerEventHandler();
  }

  _registerEventHandler() {
    throw new Error('Implements _registerEventHandler method');
  }

  _clearHTML() {
    const stuffDomWrapper = this._stuffBoxDom.getChildByID(`stuff-dom-wrapper`);
    while (stuffDomWrapper.firstChild) stuffDomWrapper.removeChild(stuffDomWrapper.lastChild);
  }

  _setHTML(html) {
    this._clearHTML();
    const stuffDomWrapper = this._stuffBoxDom.getChildByID(`stuff-dom-wrapper`);
    stuffDomWrapper.insertAdjacentHTML('beforeend', html);
  }

  setSize(width, height) {
    const stuffDomWrapper = this._stuffBoxDom.getChildByID(`stuff-dom-wrapper`);
    stuffDomWrapper.style.width = `${width}px`;
    stuffDomWrapper.style.height = `${height}px`;
    super.setSize(width, height);
  }
}

export default StuffBox;
