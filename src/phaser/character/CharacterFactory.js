import Character from './Character';
import DefaultAnimationStrategy from './animation/DefaultAnimationStrategy';
import DefaultCursorStrategy from './cursor/DefaultCursorStrategy';

class CharacterFactory {
  constructor(phaserScene) {
    this._phaserScene = phaserScene;
  }

  setPhaserScene(newPhaserScene) {
    this._phaserScene = newPhaserScene;
  }

  getMyCharacter(x, y, texture, socketId, emitMovement) {
    const character = new Character(
      this._phaserScene,
      x,
      y,
      texture,
      socketId
    ).getCharacter();

    character.setBounce(0.2);
    character.setCollideWorldBounds(true);

    character.setAnimationStrategy(
      new DefaultAnimationStrategy(this._phaserScene, texture)
    );

    character.setCursorStrategy(
      new DefaultCursorStrategy(this._phaserScene, character, emitMovement)
    );

    character.setGravityY(300);

    return character;
  }

  getAnotherCharacter(x, y, texture, socketId, animationKey) {
    const anotherCharacter = new Character(
      this._phaserScene,
      x,
      y,
      texture,
      socketId
    ).getCharacter();

    anotherCharacter.setAnimationStrategy(
      new DefaultAnimationStrategy(this._phaserScene, texture)
    );

    anotherCharacter.anims.play(animationKey);

    return anotherCharacter;
  }
}

export default CharacterFactory;
