const createCharacterCursor = (scene, character, emitMovement) => {
  const _cursors = scene.input.keyboard.createCursorKeys();

  const checkCharacterMoved = (character) =>
    character.oldPosition &&
    (character.x !== character.oldPosition.xCoordinate ||
      character.y !== character.oldPosition.yCoordinate);

  const update = () => {
    let currentAnimation = 'turn';

    if (_cursors.left.isDown) {
      character.setVelocityX(-320);
      character.anims.play('left', true);
      currentAnimation = 'left';
    } else if (_cursors.right.isDown) {
      character.setVelocityX(320);
      character.anims.play('right', true);
      currentAnimation = 'right';
    } else {
      character.setVelocityX(0);
      character.anims.play('turn');
      currentAnimation = 'turn';
    }

    if (_cursors.up.isDown && character.body.touching.down) {
      character.setVelocityY(-300);
    }

    if (checkCharacterMoved(character)) {
      emitMovement(character, currentAnimation);
    }

    character.oldPosition = {
      xCoordinate: character.x,
      yCoordinate: character.y,
    };
  };

  // event delegation
  scene.events.on('update', update, this);
};

export default createCharacterCursor;
