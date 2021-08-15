import CursorStrategy from './CursorStrategy';

const FLIGHT_MODE_CHANGE_KEY_INPUT_DURATION = 1000;

class GMCursorStrategy extends CursorStrategy {
  constructor(phaserScene, character, emitMovement) {
    super(phaserScene, character);
    this._emitMovement = emitMovement;
    this._flightModeChangeKey = this._phaserScene.input.keyboard.addKey('f');
    this._flightModeStatus = false;
  }

  checkCharacterStateChanged(character) {
    return (
      character.oldState &&
      (character.x !== character.oldState.x ||
        character.y !== character.oldState.y ||
        character.anims.getName() !== character.oldState.animation)
    );
  }

  _flightModeMovement() {
    this._character.setVelocity(0);
    this._character.anims.play('turn');

    if (this._cursor.left.isDown) {
      this._character.setVelocityX(-700);
    } else if (this._cursor.right.isDown) {
      this._character.setVelocityX(700);
    }

    if (this._cursor.up.isDown) {
      this._character.setVelocityY(-700);
    } else if (this._cursor.down.isDown) {
      this._character.setVelocityY(700);
    }
  }

  _normalModeMovement() {
    if (this._cursor.left.isDown) {
      this._character.setVelocityX(-500);
      this._character.anims.play('left', true);
    } else if (this._cursor.right.isDown) {
      this._character.setVelocityX(500);
      this._character.anims.play('right', true);
    } else {
      this._character.setVelocityX(0);
      this._character.anims.play('turn');
    }

    if (this._cursor.up.isDown && this._character.body.onFloor()) {
      this._character.setVelocityY(-400);
    }

    if (this._cursor.down.isDown && !this._character.body.onFloor()) {
      this._character.setVelocityY(1000);
    }
  }

  _listenMovementModeChangeKeyInput() {
    if (
      this._flightModeChangeKey.getDuration() > FLIGHT_MODE_CHANGE_KEY_INPUT_DURATION &&
      this._flightModeChangeKey.isDown
    ) {
      this._flightModeChangeKey.reset();
      if (this._flightModeStatus) {
        this._character.setGravityY(300);
        this._flightModeStatus = false;
      } else {
        this._character.setGravityY(0);
        this._character.setVelocityY(-1000);
        this._flightModeStatus = true;
      }
    }
  }

  update() {
    if (this._flightModeStatus) {
      this._flightModeMovement();
    } else {
      this._normalModeMovement();
    }

    this._listenMovementModeChangeKeyInput();

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

export default GMCursorStrategy;
