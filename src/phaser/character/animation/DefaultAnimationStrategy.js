import AnimationStrategy from './AnimationStrategy';

class DefaultAnimationStrategy extends AnimationStrategy {
  setup() {
    this._phaserSceneAnims.create({
      key: 'left',
      frames: this._phaserSceneAnims.generateFrameNumbers(this._texture, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this._phaserSceneAnims.create({
      key: 'turn',
      frames: [{ key: this._texture, frame: 4 }],
      frameRate: 20,
    });

    this._phaserSceneAnims.create({
      key: 'right',
      frames: this._phaserSceneAnims.generateFrameNumbers(this._texture, {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}

export default DefaultAnimationStrategy;
