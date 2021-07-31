import dude from '@/assets/dude.png';
import ShopMap from '@/assets/map/shop/shop-map.json';
import sky from '@/assets/real-sky.png';
import TileSet from '@/assets/tile-set.png';
import Phaser from '@/package/phaser';
import CharacterFactory from '@/phaser/character/CharacterFactory';
import MapManager from '@/phaser/map/MapManager';
import socket from '@/utils/socket';

const BACKGROUND_KEY = 'backgroud';
const SHOP_MAP_KEY = 'shopMap';
const TILE_SET_KEY = 'tileSet';
const SPRITE_SHEET_KEY = 'dude';

class ShopScene extends Phaser.Scene {
  constructor() {
    super('ShopScene');
  }

  preload() {
    this.load.image(TILE_SET_KEY, TileSet);
    this.load.tilemapTiledJSON(SHOP_MAP_KEY, ShopMap);
    this.load.image(BACKGROUND_KEY, sky);
    this.load.spritesheet(SPRITE_SHEET_KEY, dude, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    const villageMap = MapManager.createMap(this, BACKGROUND_KEY, SHOP_MAP_KEY, TILE_SET_KEY);
    const characterFactory = new CharacterFactory(this);

    this.cameras.main.setBounds(0, 0, villageMap.width, villageMap.height);
    this.cameras.main.setZoom(1.5);

    const myCharacter = characterFactory.getMyCharacter(
      450,
      350,
      SPRITE_SHEET_KEY,
      socket.id,
      () => true,
    );

    this.physics.add.collider(myCharacter, villageMap);
    this.cameras.main.startFollow(myCharacter, true, 0.5, 0.5);
  }
}

export default ShopScene;
