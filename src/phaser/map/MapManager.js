class MapManager {
  static createVillageMap(mapBuilder) {
    return mapBuilder
      .buildBackground(400, 300)
      .buildGround(400, 568, 2)
      .buildGround(600, 400)
      .buildGround(50, 250)
      .buildGround(750, 220)
      .build();
  }

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
