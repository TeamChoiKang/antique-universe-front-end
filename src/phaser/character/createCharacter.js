import CharacterFactory from './CharacterFactory';
import DefaultAnimationStrategy from './animation/DefaultAnimationStrategy';

const createCharacter = (scene, x, y, texture, socketId) => {
  const characterFactory = new CharacterFactory(scene);
  const character = characterFactory.createNewCharacter(
    x,
    y,
    texture,
    socketId
  );

  character.setBounce(0.2);
  character.setCollideWorldBounds(true);

  character.setAnimationStrategy(new DefaultAnimationStrategy(scene, texture));

  // Default animation
  character.anims.play('turn');

  return character;
};

export default createCharacter;
