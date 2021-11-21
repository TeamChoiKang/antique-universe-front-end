import Phaser from '@/package/phaser';

class LayoutBox extends Phaser.GameObjects.Rectangle {
  constructor(scene, x = 0, y = 0, width = 0, height = 0) {
    super(scene, x, y, width, height);
    scene.add.existing(this);
  }
}

export default LayoutBox;
