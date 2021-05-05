const createVillageMap = (scene) => {
  // Set background
  scene.add.image(400, 300, 'sky');

  const map = scene.physics.add.staticGroup();
  map.create(400, 568, 'ground').setScale(2).refreshBody();
  map.create(600, 400, 'ground');
  map.create(50, 250, 'ground');
  map.create(750, 220, 'ground');

  return map;
};

export default createVillageMap;
