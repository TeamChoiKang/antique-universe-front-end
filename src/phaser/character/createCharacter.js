import CharacterFactory from './CharacterFactory';
import DefaultAnimationStrategy from './animation/DefaultAnimationStrategy';
import DefaultCursorStrategy from './cursor/DefaultCursorStrategy';

export const createMyCharacterWithDefaultSetup = (
  phaserScene,
  x,
  y,
  texture,
  socketId,
  emitMovement
) => {
  const characterFactory = new CharacterFactory(phaserScene);
  const character = characterFactory.createNewCharacter(
    x,
    y,
    texture,
    socketId
  );

  character.setBounce(0.2);
  character.setCollideWorldBounds(true);

  character.setAnimationStrategy(
    new DefaultAnimationStrategy(phaserScene, texture)
  );

  character.setCursorStrategy(
    new DefaultCursorStrategy(phaserScene, character, emitMovement)
  );

  // Default animation
  character.anims.play('turn');

  return character;
};

export const createAnotherCharacterWithDefaultSetup = (
  phaserScene,
  x,
  y,
  texture,
  socketId,
  animation
) => {
  const characterFactory = new CharacterFactory(phaserScene);
  const anotherCharacter = characterFactory.createNewCharacter(
    x,
    y,
    texture,
    socketId
  );

  anotherCharacter.setAnimationStrategy(
    new DefaultAnimationStrategy(phaserScene, texture)
  );

  anotherCharacter.anims.play(animation);

  return anotherCharacter;
};
