import dude from '@/assets/dude.png';
import VillageMap from '@/assets/map/village/village-map.json';
import sky from '@/assets/real-sky.png';
import TileSet from '@/assets/tile-set.png';
import Phaser from '@/package/phaser';
import CharacterFactory from '@/phaser/character/CharacterFactory';
import CharacterGroup from '@/phaser/character/CharacterGroup';
import MapManager from '@/phaser/map/MapManager';
import * as sceneKeys from '@/phaser/scene/sceneKeys';
import socket from '@/utils/socket';

const BACKGROUND_KEY = 'backgroud';
const VILLAGE_MAP_KEY = 'villageMap';
const TILE_SET_KEY = 'tileSet';
const SPRITE_SHEET_KEY = 'dude';

class VillageScene extends Phaser.Scene {
  constructor() {
    super(sceneKeys.VILLAGE_SCENE_KEY);
  }

  preload() {
    this.load.image(TILE_SET_KEY, TileSet);
    this.load.tilemapTiledJSON(VILLAGE_MAP_KEY, VillageMap);
    this.load.image(BACKGROUND_KEY, sky);
    this.load.spritesheet(SPRITE_SHEET_KEY, dude, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    const villageMap = MapManager.createMap(this, BACKGROUND_KEY, VILLAGE_MAP_KEY, TILE_SET_KEY);
    const characterFactory = new CharacterFactory(this);
    const characterGroup = new CharacterGroup(this);

    this.cameras.main.setBounds(0, 0, villageMap.width, villageMap.height);
    this.cameras.main.setZoom(1.5);

    socket.emit('character:start', 'start');

    socket.on('character:myCharacter', myCharacterInfo => {
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

      this.physics.add.collider(myCharacter, villageMap);
      this.cameras.main.startFollow(myCharacter, true, 0.5, 0.5);
    });

    socket.on('character:currentCharacter', characters => {
      Object.keys(characters).forEach(index => {
        characterGroup.add(
          characterFactory.getAnotherCharacter(
            characters[index].x,
            characters[index].y,
            SPRITE_SHEET_KEY,
            characters[index].socketId,
            characters[index].animation,
          ),
        );
      });
    });

    socket.on('character:newCharacter', characterInfo => {
      characterGroup.add(
        characterFactory.getAnotherCharacter(
          characterInfo.x,
          characterInfo.y,
          SPRITE_SHEET_KEY,
          characterInfo.socketId,
          characterInfo.animation,
        ),
      );
    });

    socket.on('character:moved', characterInfo => {
      const movedCharacter = characterGroup.find(characterInfo.socketId);

      movedCharacter.setPosition(characterInfo.x, characterInfo.y);

      movedCharacter.anims.play(characterInfo.animation, true);
    });

    socket.on('character:disconnection', socketId => {
      characterGroup.remove(socketId);
    });
  }
}

export default VillageScene;
