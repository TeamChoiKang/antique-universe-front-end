import Phaser from '@/package/phaser';

class PortalZone extends Phaser.GameObjects.Zone {
  constructor(scene, x, y, width, height, character, enterKey, enterKeyDownAction) {
    super(scene, x, y, width, height);
    this._overlapState = false;

    scene.physics.world.enable(this);
    scene.physics.add.overlap(character, this);

    const overlapEventHandler = () => {
      if (!this.body.touching.none) this._overlapState = true;
      else this._overlapState = false;
    };

    const enterKeyDownHandler = () => {
      if (this._overlapState) enterKeyDownAction();
    };

    enterKey.on('down', enterKeyDownHandler);
    scene.events.on('update', overlapEventHandler);
    scene.events.once('shutdown', () => {
      scene.events.off('update', overlapEventHandler);
      enterKey.off('down', enterKeyDownHandler);
    });
  }
}

export default PortalZone;
