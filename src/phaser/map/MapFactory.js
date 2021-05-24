import MapBuilder from './MapBuilder';

class MapFactory {
  static village(scene) {
    const map = new MapBuilder(scene)
      .setKey('sky')
      .background(400, 300)
      .setKey('ground')
      .ground(400, 568, 2)
      .ground(600, 400)
      .ground(50, 250)
      .ground(750, 220)
      .build();

    return map;
  }
}

export default MapFactory;
