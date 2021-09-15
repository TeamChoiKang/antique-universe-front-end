import DomBox from '@/phaser/scene/ShopManagerScene/uiObjects/DomBox';

const STUFF_LIST_BOX_RATIO = 0.661;

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

  setSizeWithFixedRatio(width) {
    this.setSize(width, Number.parseInt(width * STUFF_LIST_BOX_RATIO, 10));
  }
}

export default StuffBox;
