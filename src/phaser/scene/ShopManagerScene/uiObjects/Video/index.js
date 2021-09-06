import Phaser from '@/package/phaser';

class Video extends Phaser.GameObjects.Video {
  constructor(scene, videoAssetKey, width = 0, height = 0) {
    super(scene, 0, 0, videoAssetKey);
    this.setDisplaySize(width, height);
    scene.add.existing(this);
  }
}

export default Video;
