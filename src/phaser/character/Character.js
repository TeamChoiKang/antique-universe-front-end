class Character {
  constructor(scene, x, y, texture, socketId) {
    this._scene = scene;
    this._socketId = socketId;
    this._character = scene.physics.add.sprite(x, y, texture);

    this._character.setAnimationStrategy = function (newAnimationStrategy) {
      this._animationStrategy = newAnimationStrategy;
      this._animationStrategy.setup();
    };

    this._character.getAnimationStrategy = function () {
      return this._animationStrategy;
    };

    this._character.setCursorStrategy = function (newCursorStrategy) {
      this._cursorStrategy = newCursorStrategy;
      this._cursorStrategy.setup();
    };

    this._character.getCursorStrategy = function () {
      return this._cursorStrategy;
    };

    this._character.socketId = socketId;

    return this._character;
  }
}

export default Character;
