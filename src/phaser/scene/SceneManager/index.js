class SceneManager {
  static setTileMap(scene, backgroundKey, jsonTileMapKey, tileSetKey) {
    scene.add.image(0, 0, backgroundKey).setOrigin(0, 0);

    const tileMap = scene.make.tilemap({ key: jsonTileMapKey });
    const tileSet = tileMap.addTilesetImage('au_tile_set', tileSetKey);
    const sceneWithTileMap = tileMap.createLayer('World', tileSet);

    sceneWithTileMap.setCollisionByExclusion(-1, true);
    scene.physics.world.setBounds(0, 0, sceneWithTileMap.width, sceneWithTileMap.height);

    return sceneWithTileMap;
  }

  static changeScene(scene, sceneKey) {
    scene.scene.start(sceneKey);
  }
}

export default SceneManager;
