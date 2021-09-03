import Phaser from '@/package/phaser';

class LayoutBox extends Phaser.GameObjects.Zone {
  constructor(scene, x, y, width, height) {
    super(scene, x, y, width, height);
    this.setOrigin(0);

    scene.add.existing(this);
  }
}

export default LayoutBox;
