class MapManager {
  static createMap(scene, backgroundKey, jsonTileMapKey, tileSetKey) {
    scene.add.image(0, 0, backgroundKey).setOrigin(0, 0);
    const tileMap = scene.make.tilemap({ key: jsonTileMapKey });
    const tileSet = tileMap.addTilesetImage('au_tile_set', tileSetKey);
    const map = tileMap.createLayer('World', tileSet);
    map.setCollisionByExclusion(-1, true);

    return map;
  }
}

export default MapManager;
