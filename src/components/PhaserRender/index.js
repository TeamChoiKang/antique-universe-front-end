import React, { useEffect } from 'react';

import Phaser from '@/package/phaser';
import ShopScene from '@/phaser/scene/ShopScene';
import VillageScene from '@/phaser/scene/VillageScene';

import './phaserRender.css';

const PHASER_CONFIG = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  parent: 'phaser__parent',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [VillageScene, ShopScene],
};

const PhaserRender = () => {
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const game = new Phaser.Game(PHASER_CONFIG);
  }, []);

  return <div id="phaser__parent" />;
};

export default PhaserRender;
