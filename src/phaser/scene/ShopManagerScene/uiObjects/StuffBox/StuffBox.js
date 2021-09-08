import DomBox from '@/phaser/scene/ShopManagerScene/uiObjects/DomBox';

class StuffBox extends DomBox {
  constructor(scene, stuffs, width = 0, height = 0) {
    super(scene, `stuff-dom-wrapper`, width, height);
    this._stuffs = stuffs;
    this._setColor(0xffffff);
    scene.add.existing(this);
    this._registerEventHandler();
  }

  _registerEventHandler() {
    throw new Error('Implements _registerEventHandler method');
  }
}

export default StuffBox;
