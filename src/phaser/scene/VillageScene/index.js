import dude from '@/assets/dude.png';
import VillageMap from '@/assets/map/village/village-map.json';
import platform from '@/assets/platform.png';
import sky from '@/assets/real-sky.png';
import TileSet from '@/assets/tile-set.png';
import Phaser from '@/package/phaser';
import io from '@/package/socket';
import CharacterFactory from '@/phaser/character/CharacterFactory';
import CharacterGroup from '@/phaser/character/CharacterGroup';
import MapManager from '@/phaser/map/MapManager';

class VillageScene extends Phaser.Scene {
  preload() {
    this.load.image('tileSet', TileSet);
    this.load.tilemapTiledJSON('villageMap', VillageMap);
    this.load.image('defaultBackground', sky);
    this.load.image('defaultGround', platform);
    this.load.spritesheet('dude', dude, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    const socket = io('http://localhost:3001/');

    const villageMap = MapManager.createMap(this, 'defaultBackground', 'villageMap', 'tileSet');
    const characterFactory = new CharacterFactory(this);
    const characterGroup = new CharacterGroup(this);

    this.cameras.main.setBounds(0, 0, villageMap.width, villageMap.height);
    this.cameras.main.setZoom(1.5);

    socket.on('character:currentCharacter', characters => {
      Object.keys(characters).forEach(index => {
        if (characters[index].socketId === socket.id) {
          const myCharacter = characterFactory.getMyCharacter(
            characters[index].x,
            characters[index].y,
            'dude',
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
        } else {
          characterGroup.add(
            characterFactory.getAnotherCharacter(
              characters[index].x,
              characters[index].y,
              'dude',
              characters[index].socketId,
              characters[index].animation,
            ),
          );
        }
      });
    });

    socket.on('character:newCharacter', characterInfo => {
      characterGroup.add(
        characterFactory.getAnotherCharacter(
          characterInfo.x,
          characterInfo.y,
          'dude',
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
