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

    this._stuffs = stuffs;

    scene.add.existing(this);

    this._registerEventHandler();
  }

  _registerEventHandler() {
    throw new Error('Implements _registerEventHandler method');
  }

  _clearHTML() {
    const stuffDomWrapper = this.getChildByID(`stuff-dom-wrapper`);
    while (stuffDomWrapper.firstChild) stuffDomWrapper.removeChild(stuffDomWrapper.lastChild);
  }

  _setHTML(html) {
    this._clearHTML();
    const stuffDomWrapper = this.getChildByID(`stuff-dom-wrapper`);
    stuffDomWrapper.insertAdjacentHTML('beforeend', html);
  }

  setSize(width, height) {
    const stuffDomWrapper = this.getChildByID(`stuff-dom-wrapper`);
    stuffDomWrapper.style.width = `${width}px`;
    stuffDomWrapper.style.height = `${height}px`;
  }
}

export default StuffBox;
