import dude from '@/assets/dude.png';
import TileSet from '@/assets/tile-set.png';
import ShopBackground from '@/assets/tileMap/shop/shop-background.png';
import ShopTileMap from '@/assets/tileMap/shop/shop-tile-map.json';
import Phaser from '@/package/phaser';
import CharacterFactory from '@/phaser/character/CharacterFactory';
import CharacterGroup from '@/phaser/character/CharacterGroup';
import * as sceneKeys from '@/phaser/scene/sceneKeys';
import SceneManager from '@/phaser/scene/SceneManager';
import Socket from '@/utils/socket';

const BACKGROUND_KEY = 'shopSceneBackground';
const SHOP_TILE_MAP_KEY = 'shopTileMap';
const TILE_SET_KEY = 'tileSet';
const SPRITE_SHEET_KEY = 'dude';

class ShopScene extends Phaser.Scene {
  constructor() {
    super(sceneKeys.SHOP_SCENE_KEY);
  }

  preload() {
    this.load.image(TILE_SET_KEY, TileSet);
    this.load.tilemapTiledJSON(SHOP_TILE_MAP_KEY, ShopTileMap);
    this.load.image(BACKGROUND_KEY, ShopBackground);
    this.load.spritesheet(SPRITE_SHEET_KEY, dude, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    const socket = Socket.getInstance();
    const sceneWithTileMap = SceneManager.setTileMap(
      this,
      BACKGROUND_KEY,
      SHOP_TILE_MAP_KEY,
      TILE_SET_KEY,
    );
    const characterFactory = new CharacterFactory(this);
    const characterGroup = new CharacterGroup(this);

    const createAnotherCharacterAndAppendToCharacterGroup = characterInfo => {
      const anotherCharacter = characterFactory.getAnotherCharacter(
        characterInfo.x,
        characterInfo.y,
        SPRITE_SHEET_KEY,
        characterInfo.socketId,
        characterInfo.animation,
      );

      characterGroup.add(anotherCharacter);
    };

    this.cameras.main.setBounds(0, 0, sceneWithTileMap.width, sceneWithTileMap.height);
    this.cameras.main.setZoom(1.5);

    const sceneChangeKey = this.input.keyboard.addKey('c');
    sceneChangeKey.on('down', () => {
      socket.removeAllListeners();
      SceneManager.changeScene(this, sceneKeys.VILLAGE_SCENE_KEY);
    });

    socket.emit('map:join', 'shop');

    socket.emit('character:start', 'start');

    socket.once('character:myCharacter', myCharacterInfo => {
      const myCharacter = characterFactory.getMyCharacter(
        myCharacterInfo.x,
        myCharacterInfo.y,
        SPRITE_SHEET_KEY,
        socket.id,
        character => {
          socket.emit('character:move', {
            x: character.x,
            y: character.y,
            animation: character.anims.getName(),
          });
        },
      );

      this.physics.add.collider(myCharacter, sceneWithTileMap);
      this.cameras.main.startFollow(myCharacter, true, 0.5, 0.5);
    });

    socket.once('character:currentCharacter', characters => {
      Object.keys(characters).forEach(index => {
        createAnotherCharacterAndAppendToCharacterGroup(characters[index]);
      });
    });

    socket.on('character:newCharacter', characterInfo => {
      createAnotherCharacterAndAppendToCharacterGroup(characterInfo);
    });

    socket.on('character:moved', characterInfo => {
      const movedCharacter = characterGroup.find(characterInfo.socketId);

      if (!movedCharacter) return;
      movedCharacter.setPosition(characterInfo.x, characterInfo.y);
      movedCharacter.anims.play(characterInfo.animation, true);
    });

    socket.on('character:disconnection', socketId => {
      characterGroup.remove(socketId);
    });
  }
}

export default ShopScene;
