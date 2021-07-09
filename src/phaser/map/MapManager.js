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
}

export default MapManager;
