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

    character.setAnimationStrategy = (newAnimationStrategy) => {
      character._animationStrategy = newAnimationStrategy;
      character._animationStrategy.setup();
    };

    character.setCursorStrategy = (newCursorStrategy) => {
      character._cursorStrategy = newCursorStrategy;
      character._cursorStrategy.setup();
    };

    return character;
  }
}

export default CharacterFactory;
