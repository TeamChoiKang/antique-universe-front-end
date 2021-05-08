import CursorStrategy from './CursorStrategy';

class DefaultCursorStrategy extends CursorStrategy {
  constructor(phaserScene, character, emitMovement) {
    super(phaserScene, character);
    this._emitMovement = emitMovement;
  }

  checkCharacterMoved(character) {
    return (
      character.oldPosition &&
      (character.x !== character.oldPosition.xCoordinate ||
        character.y !== character.oldPosition.yCoordinate)
    );
  }

  update() {
    if (this._cursor.left.isDown) {
      this._character.setVelocityX(-320);
      this._character.anims.play('left', true);
    } else if (this._cursor.right.isDown) {
      this._character.setVelocityX(320);
      this._character.anims.play('right', true);
    } else {
      this._character.setVelocityX(0);
      this._character.anims.play('turn');
    }

    if (this._cursor.up.isDown && this._character.body.touching.down) {
      this._character.setVelocityY(-300);
    }

    if (this.checkCharacterMoved(this._character)) {
      this._emitMovement(this._character);
    }

    this._character.oldPosition = {
      xCoordinate: this._character.x,
      yCoordinate: this._character.y,
    };
  }
}

export default DefaultCursorStrategy;
