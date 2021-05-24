import MapBuilder from './MapBuilder';

class MapFactory {
  static village(scene) {
    const map = new MapBuilder(scene)
      .setKey('sky')
      .setBackground(400, 300)
      .setKey('ground')
      .create(400, 568, 2)
      .create(600, 400)
      .create(50, 250)
      .create(750, 220)
      .build();

    return map;
  }
}

export default MapFactory;
