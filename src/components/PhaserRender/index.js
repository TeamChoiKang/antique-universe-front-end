import { useEffect } from 'react';
import Phaser from './../../package/phaser';

import VillageScene from './../../phaser/scene/VillageScene';

const PHASER_CONFIG = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'phaser__parent',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: VillageScene,
};

const PhaserRender = () => {
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const game = new Phaser.Game(PHASER_CONFIG);
  }, []);

  return <div id="phaser__parent"></div>;
};

export default PhaserRender;