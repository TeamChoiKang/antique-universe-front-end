import dude from '@/assets/dude.png';
import TileSet from '@/assets/tile-set.png';
import ShopBackground from '@/assets/tileMap/shop/shop-background.png';
import ShopTileMap from '@/assets/tileMap/shop/shop-tile-map.json';
import PeerConnectionManager from '@/model/WebRtc/PeerConnectionManager';
import Phaser from '@/package/phaser';
import CharacterFactory from '@/phaser/character/CharacterFactory';
import CharacterGroup from '@/phaser/character/CharacterGroup';
import PortalZoneManager from '@/phaser/portalZone/PortalZoneManager';
import * as sceneKeys from '@/phaser/scene/sceneKeys';
import SceneManager from '@/phaser/scene/SceneManager';
import ShopManagerScene from '@/phaser/scene/ShopManagerScene';
import SocketManager from '@/utils/socket/SocketManager';

const BACKGROUND_KEY = 'shopSceneBackground';
const SHOP_TILE_MAP_KEY = 'shopTileMap';
const TILE_SET_KEY = 'tileSet';
const SPRITE_SHEET_KEY = 'dude';

class ShopScene extends Phaser.Scene {
  constructor() {
    super(sceneKeys.SHOP_SCENE_KEY);
    this._sceneName = undefined;
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

  init(sceneName) {
    this._sceneName = sceneName;
  }

  create() {
    const socket = new SocketManager();
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
    const peerConnectionManager = new PeerConnectionManager(socket);

    this.cameras.main.setBounds(0, 0, sceneWithTileMap.width, sceneWithTileMap.height);
    this.cameras.main.setZoom(1.5);

    socket.emit('map:join', this._sceneName);

    socket.emit('character:start', 'start');

    peerConnectionManager.createSenderPeerConnection();
    this.scene.add(
      sceneKeys.SHOP_MANAGER_SCENE_KEY,
      new ShopManagerScene(this, this._sceneName),
      true,
    );

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

      const enterKey = this.input.keyboard.addKey('space');

      const portalZoneManager = new PortalZoneManager(this, enterKey, myCharacter);

      portalZoneManager.createPortalZone(sceneKeys.VILLAGE_SCENE_KEY, 928, 935, () => {
        socket.removeAllListeners();
        peerConnectionManager.closeAllPeerConnection();
        SceneManager.changeScene(this, sceneKeys.VILLAGE_SCENE_KEY);
      });
    });

    socket.once('character:currentCharacter', currentCharacter => {
      Object.keys(currentCharacter).forEach(index => {
        createAnotherCharacterAndAppendToCharacterGroup(currentCharacter[index]);
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
      peerConnectionManager.closeReceiverPeerConnection(socketId);
    });
  }
}

export default ShopScene;
