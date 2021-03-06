import CursorStrategy from './CursorStrategy';

class DefaultCursorStrategy extends CursorStrategy {
  constructor(phaserScene, character, emitMovement) {
    super(phaserScene, character);
    this._emitMovement = emitMovement;
  }

  checkCharacterStateChanged(character) {
    return (
      character.oldState &&
      (character.x !== character.oldState.x ||
        character.y !== character.oldState.y ||
        character.anims.getName() !== character.oldState.animation)
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

    if (this._cursor.up.isDown && this._character.body.onFloor()) {
      this._character.setVelocityY(-300);
    }

    if (this.checkCharacterStateChanged(this._character)) {
      this._emitMovement(this._character);
    }

    this._character.oldState = {
      x: this._character.x,
      y: this._character.y,
      animation: this._character.anims.getName(),
    };
  }
}

export default DefaultCursorStrategy;
