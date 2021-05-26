import MapBuilder from './MapBuilder';

class MapFactory {
  static village(scene) {
    const map = new MapBuilder(scene)
      .setKey('sky')
      .buildBackground(400, 300)
      .setKey('ground')
      .buildGround(400, 568, 2)
      .buildGround(600, 400)
      .buildGround(50, 250)
      .buildGround(750, 220)
      .build();

    return map;
  }
}

export default MapFactory;
