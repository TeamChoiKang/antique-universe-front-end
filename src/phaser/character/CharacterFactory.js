class CharacterFactory {
  constructor(phaserScene) {
    this._phaserScene = phaserScene;
  }

  setPhaserScene(newPhaserScene) {
    this._phaserScene = newPhaserScene;
  }

  createNewCharacter(x, y, texture, socketId = '') {
    const character = this._phaserScene.physics.add.sprite(x, y, texture);

    character.socketId = socketId;

    return character;
  }
}

export default CharacterFactory;
