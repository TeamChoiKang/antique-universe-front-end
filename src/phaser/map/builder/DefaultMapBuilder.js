class DefaultMapBuilder {
  constructor(scene) {
    this._scene = scene;
    this._map = scene.physics.add.staticGroup();
  }

  buildBackground(width, height) {
    this._scene.add.image(width, height, 'defaultBackground');
    return this;
  }

  buildGround(x, y, scale = 0) {
    if (scale) this._map.create(x, y, 'defaultGround').setScale(scale).refreshBody();
    else this._map.create(x, y, 'defaultGround');
    return this;
  }

  build() {
    return this._map;
  }
}

export default DefaultMapBuilder;
