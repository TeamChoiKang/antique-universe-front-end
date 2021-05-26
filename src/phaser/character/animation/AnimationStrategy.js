class AnimationStrategy {
  constructor(phaserScene, texture) {
    this._phaserSceneAnims = phaserScene.anims;
    this._texture = texture;
  }

  setup() {
    throw new Error('Implements AnimationStrategy setup method');
  }
}

export default AnimationStrategy;
