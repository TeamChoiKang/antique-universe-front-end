import GmCursorStrategy from '@/phaser/character/cursor/GmCursorStrategy';

import DefaultAnimationStrategy from './animation/DefaultAnimationStrategy';
import Character from './Character';
import DefaultCursorStrategy from './cursor/DefaultCursorStrategy';

class CharacterFactory {
  constructor(phaserScene) {
    this._phaserScene = phaserScene;
  }

  setPhaserScene(newPhaserScene) {
    this._phaserScene = newPhaserScene;
  }

  getMyCharacter(x, y, texture, socketId, emitMovement) {
    const character = new Character(this._phaserScene, x, y, texture, socketId);

    character.setBounce(0.2);
    character.setCollideWorldBounds(true);

    character.setAnimationStrategy(new DefaultAnimationStrategy(this._phaserScene, texture));

    character.setCursorStrategy(
      new DefaultCursorStrategy(this._phaserScene, character, emitMovement),
    );

    character.setGravityY(300);

    return character;
  }

  getGmCharacter(x, y, texture, socketId, emitMovement) {
    const character = this.getMyCharacter(x, y, texture, socketId, emitMovement);
    character.setCursorStrategy(new GmCursorStrategy(this._phaserScene, character, emitMovement));

    return character;
  }

  getAnotherCharacter(x, y, texture, socketId, animationKey) {
    const anotherCharacter = new Character(this._phaserScene, x, y, texture, socketId);

    anotherCharacter.setAnimationStrategy(new DefaultAnimationStrategy(this._phaserScene, texture));

    anotherCharacter.anims.play(animationKey);

    return anotherCharacter;
  }
}

export default CharacterFactory;
