import Phaser from '@/package/phaser';

class LayoutBox extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height) {
    super(scene, x, y);

    super.setSize(width, height);

    scene.add.existing(this);
  }
}

export default LayoutBox;
