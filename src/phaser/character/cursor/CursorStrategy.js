class CursorStrategy {
  constructor(phaserScene, character) {
    this._phaserScene = phaserScene;
    this._cursor = phaserScene.input.keyboard.createCursorKeys();
    this._character = character;
  }

  update() {
    throw new Error('Implements CursorStrategy update method');
  }

  setup() {
    this._phaserScene.events.on('update', this.update, this);
    this._phaserScene.events.once('shutdown', () => {
      this._phaserScene.events.off('update', this.update);
    });
  }

  destroy() {
    this._phaserScene.events.off('update', this.update);
  }
}

export default CursorStrategy;
