class MapManager {
  static createVillageMap(mapBuilder) {
    return mapBuilder
      .setKey('background')
      .buildBackground(400, 300)
      .setKey('ground')
      .buildGround(400, 568, 2)
      .buildGround(600, 400)
      .buildGround(50, 250)
      .buildGround(750, 220)
      .build();
  }
}

export default MapManager;
