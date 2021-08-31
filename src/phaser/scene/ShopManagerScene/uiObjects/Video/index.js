import Phaser from '@/package/phaser';

class Video extends Phaser.GameObjects.Video {
  constructor(scene, videoAssetKey, width, height) {
    super(scene, 0, 0, videoAssetKey);
    this.setDisplaySize(width, height).setOrigin(0);

    scene.add.existing(this);
  }
}

export default Video;
