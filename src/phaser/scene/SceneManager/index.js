import ModalScene from '@/phaser/scene/ModalScene';
import * as sceneKeys from '@/phaser/scene/sceneKeys';

class SceneManager {
  static setTileMap(scene, backgroundKey, jsonTileMapKey, tileSetKey) {
    scene.add.image(0, 0, backgroundKey).setOrigin(0, 0);

    const tileMap = scene.make.tilemap({ key: jsonTileMapKey });
    const tileSet = tileMap.addTilesetImage('au_tile_set', tileSetKey);
    const sceneWithTileMap = tileMap.createLayer('World', tileSet);

    sceneWithTileMap.setCollisionByExclusion(-1, true);
    scene.physics.world.setBounds(0, 0, sceneWithTileMap.width, sceneWithTileMap.height);

    tileMap.createLayer('WorldBack', tileSet);
    tileMap.createLayer('WorldFront', tileSet).setDepth(10000);

    return sceneWithTileMap;
  }

  static changeScene(scene, sceneKey, data) {
    scene.scene.start(sceneKey, data);
  }

  static createModalScene(scene) {
    const modalSceneInstance = new ModalScene();
    scene.scene.add(sceneKeys.MODAL_SCENE, modalSceneInstance, true);
    return modalSceneInstance;
  }

  static removeModalScene(modalScene) {
    modalScene.scene.remove(modalScene);
  }
}

export default SceneManager;
