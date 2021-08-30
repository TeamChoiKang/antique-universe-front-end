class Video {
  constructor(scene, videoAssetKey, width, height) {
    this._videoObject = scene.add.video(0, 0, videoAssetKey);
    this._videoObject.setDisplaySize(width, height).setOrigin(0);

    return this._videoObject;
  }

  play(bool) {
    this._videoObject.play(bool);
  }
}

export default Video;
