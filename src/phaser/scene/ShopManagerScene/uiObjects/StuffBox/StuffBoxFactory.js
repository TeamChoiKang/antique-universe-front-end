import * as stuffBoxType from '@/phaser/scene/ShopManagerScene/uiObjects/StuffBox/stuffBoxType';

import AdminStuffBox from './AdminStuffBox';
import NormalStuffBox from './NormalStuffBox';

class StuffBoxFactory {
  constructor(phaserScene) {
    this._phaserScene = phaserScene;
  }

  setPhaserScene(newPhaserScene) {
    this._phaserScene = newPhaserScene;
  }

  createStuffBox(type, width = 0, height = 0) {
    switch (type) {
      case stuffBoxType.NORMAL_STUFF_BOX:
        return new NormalStuffBox(this._phaserScene, width, height);

      case stuffBoxType.ADMIN_STUFF_BOX:
        return new AdminStuffBox(this._phaserScene, width, height);

      default:
        return new Error('Please input stuffbox type');
    }
  }
}

export default StuffBoxFactory;
