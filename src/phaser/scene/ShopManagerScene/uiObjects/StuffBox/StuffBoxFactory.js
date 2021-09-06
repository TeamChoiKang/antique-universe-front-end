import AdminStuffBox from './AdminStuffBox';
import NormalStuffBox from './NormalStuffBox';

class StuffBoxFactory {
  constructor(phaserScene) {
    this._phaserScene = phaserScene;
  }

  setPhaserScene(newPhaserScene) {
    this._phaserScene = newPhaserScene;
  }

  createStuffBox(stuffs, type, width = 0, height = 0) {
    if (type === 'normal') return new NormalStuffBox(this._phaserScene, stuffs, width, height);
    if (type === 'admin') return new AdminStuffBox(this._phaserScene, stuffs, width, height);
    return new Error('Please input stuffbox type');
  }
}

export default StuffBoxFactory;
