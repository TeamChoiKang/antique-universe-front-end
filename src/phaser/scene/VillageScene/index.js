import dude from '@/assets/dude.png';
import sky from '@/assets/real-sky.png';
import TileSet from '@/assets/tile-set.png';
import VillageTileMap from '@/assets/tileMap/village/village-tile-map.json';
import PeerConnectionManager from '@/model/WebRtc/PeerConnectionManager';
import Phaser from '@/package/phaser';
import CharacterFactory from '@/phaser/character/CharacterFactory';
import CharacterGroup from '@/phaser/character/CharacterGroup';
import PortalZoneManager from '@/phaser/portalZone/PortalZoneManager';
import * as sceneKeys from '@/phaser/scene/sceneKeys';
import SceneManager from '@/phaser/scene/SceneManager';
import * as shopNames from '@/phaser/scene/shopNames';
import SocketManager from '@/utils/socket/SocketManager';

const BACKGROUND_KEY = 'backgroud';
const VILLAGE_TILE_MAP_KEY = 'villageTileMap';
const TILE_SET_KEY = 'tileSet';
const SPRITE_SHEET_KEY = 'dude';
const CONFIRM_MSG = '상점의 주인이 없습니다. 상점의 주인이 돼서 물건을 거래하시겠습니까?';
const ALERT_MSG = '주인이 없는 상점에는 들어갈 수 없습니다.';

class VillageScene extends Phaser.Scene {
  constructor() {
    super(sceneKeys.VILLAGE_SCENE_KEY);
  }

  preload() {
    this.load.image(TILE_SET_KEY, TileSet);
    this.load.tilemapTiledJSON(VILLAGE_TILE_MAP_KEY, VillageTileMap);
    this.load.image(BACKGROUND_KEY, sky);
    this.load.spritesheet(SPRITE_SHEET_KEY, dude, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    const socket = new SocketManager();
    const sceneWithTileMap = SceneManager.setTileMap(
      this,
      BACKGROUND_KEY,
      VILLAGE_TILE_MAP_KEY,
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

    const changeScene = (sceneKey, sceneName) => {
      socket.removeAllListeners();
      peerConnectionManager.closeAllPeerConnection();
      SceneManager.changeScene(this, sceneKey, sceneName);
    };

    this.cameras.main.setBounds(0, 0, sceneWithTileMap.width, sceneWithTileMap.height);
    this.cameras.main.setZoom(1.5);

    socket.on('map:getShopOwner', ({ owner, shopName }) => {
      if (owner) {
        changeScene(sceneKeys.SHOP_SCENE_KEY, shopName);
        return;
      }

      if (window.confirm(CONFIRM_MSG)) {
        socket.emit('map:registerShopOwner', {
          socketId: socket.id,
          shopName,
        });
        changeScene(sceneKeys.SHOP_SCENE_KEY, shopName);
      } else {
        window.alert(ALERT_MSG);
      }
    });

    socket.emit('map:join', sceneKeys.VILLAGE_SCENE_KEY);

    socket.emit('character:start', 'start');

    peerConnectionManager.createSenderPeerConnection();

    socket.once('character:myCharacter', myCharacterInfo => {
      const myCharacter = characterFactory.getGmCharacter(
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

      shopNames.SHOP_NAMES.forEach(shopInfo => {
        portalZoneManager.createPortalZone(shopInfo.name, shopInfo.x, shopInfo.y, () => {
          socket.emit('map:getShopOwner', shopInfo.name);
        });
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

export default VillageScene;
