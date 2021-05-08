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
  }
}

export default CursorStrategy;
