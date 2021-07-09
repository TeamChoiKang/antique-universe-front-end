import dude from '@/assets/dude.png';
import platform from '@/assets/platform.png';
import sky from '@/assets/sky.png';
import Phaser from '@/package/phaser';
import io from '@/package/socket';
import CharacterFactory from '@/phaser/character/CharacterFactory';
import CharacterGroup from '@/phaser/character/CharacterGroup';
import MapBuilder from '@/phaser/map/builder/MapBuilder';
import MapManager from '@/phaser/map/MapManager';

class VillageScene extends Phaser.Scene {
  preload() {
    this.load.image('background', sky);
    this.load.image('ground', platform);
    this.load.spritesheet('dude', dude, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    const socket = io('http://localhost:3001/');

    const villageMap = MapManager.createVillageMap(new MapBuilder(this));
    const characterFactory = new CharacterFactory(this);
    const characterGroup = new CharacterGroup(this);

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
