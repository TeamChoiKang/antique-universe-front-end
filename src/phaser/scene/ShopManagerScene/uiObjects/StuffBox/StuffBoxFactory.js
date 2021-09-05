import AdminStuffBox from './AdminStuffBox';
import NormalStuffBox from './NormalStuffBox';

class StuffBoxFactory {
  constructor(phaserScene) {
    this._phaserScene = phaserScene;
  }

  setPhaserScene(newPhaserScene) {
    this._phaserScene = newPhaserScene;
  }

  createStuffBox(width, height, stuffs, type) {
    if (type === 'normal') return new NormalStuffBox(this._phaserScene, width, height, stuffs);
    if (type === 'admin') return new AdminStuffBox(this._phaserScene, width, height, stuffs);
    return new Error('Please input stuffbox type');
  }
}

export default StuffBoxFactory;
