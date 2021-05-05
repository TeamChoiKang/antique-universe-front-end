import createCharacterAnimation from './animation/createCharacterAnimation';

const createCharacter = (scene, x, y, texture) => {
  const character = scene.physics.add.sprite(x, y, texture);
  character.setBounce(0.2);
  character.setCollideWorldBounds(true);

  createCharacterAnimation(scene.anims);

  // Default animation
  character.anims.play('turn');

  return character;
};

export default createCharacter;
