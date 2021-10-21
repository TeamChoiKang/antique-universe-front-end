import DomBox from '@/phaser/scene/ShopManagerScene/uiObjects/DomBox';

const STUFF_LIST_BOX_RATIO = 0.661;

class StuffBox extends DomBox {
  constructor(scene, width = 0, height = 0) {
    super(scene, `stuff-dom-wrapper`, width, height);
    this._stuffs = [];
    this.setBackgroundColor(`ffffff`);
    this._registerEventHandler();
  }

  _registerEventHandler() {
    throw new Error('Implements _registerEventHandler method');
  }

  _setStuffs(newStuffs) {
    this._stuffs = newStuffs;
  }

  _findStuff(stuffId) {
    return this._stuffs.find(v => v.getStuffId() === stuffId);
  }

  setSizeWithFixedRatio(width) {
    this.setSize(width, Number.parseInt(width * STUFF_LIST_BOX_RATIO, 10));
  }
}

export default StuffBox;
