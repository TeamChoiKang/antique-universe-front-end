import Phaser from '@/package/phaser';

const VIDEO_RATIO = 0.558;

class Video extends Phaser.GameObjects.Video {
  constructor(scene, videoAssetKey, width = 0, height = 0) {
    super(scene, 0, 0, videoAssetKey);
    this.setDisplaySize(width, height);
    scene.add.existing(this);
  }

  setSizeWithFixedRatio(width) {
    this.setDisplaySize(width, Number.parseInt(width * VIDEO_RATIO, 10));
  }
}

export default Video;
