class MapBuilder {
  constructor(scene) {
    this._scene = scene;
    this._map = scene.physics.add.staticGroup();
  }

  setKey(key) {
    this._key = key;
    return this;
  }

  setBackground(width, height) {
    this._scene.add.image(width, height, this._key);
    return this;
  }

  create(x, y, scale = 0) {
    if (scale) this._map.create(x, y, this._key).setScale(scale).refreshBody();
    else this._map.create(x, y, this._key);
    return this;
  }

  build() {
    return this._map;
  }
}

export default MapBuilder;
