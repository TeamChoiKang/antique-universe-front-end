import { useEffect } from 'react';
import Phaser from 'phaser';

import platform from './../../assets/platform.png';

class PhaserScene extends Phaser.Scene {
  preload() {
    this.load.image(
      'sky',
      'https://phaser.io/content/tutorials/making-your-first-phaser-3-game/part3.png'
    );
    this.load.image('ground', platform);
    this.load.spritesheet(
      'dude',
      'https://phaser.io/content/tutorials/making-your-first-phaser-3-game/dude.png',
      {
        frameWidth: 32,
        frameHeight: 48,
      }
    );
  }

  create() {
    this.add.image(400, 300, 'sky');

    const map = this.physics.add.staticGroup();
    map.create(400, 568, 'ground').setScale(2).refreshBody();
    map.create(600, 400, 'ground');
    map.create(50, 250, 'ground');
    map.create(750, 220, 'ground');

    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(this.player, map);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

const PHASER_CONFIG = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'phaser__parent',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: PhaserScene,
};

const PhaserRender = () => {
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const game = new Phaser.Game(PHASER_CONFIG);
  }, []);

  return <div id="phaser__parent"></div>;
};

export default PhaserRender;
