import Phaser from './../../../package/phaser';
import io from './../../../package/socket';

import MapFactory from './../../map/MapFactory';
import CharacterFactory from './../../character/CharacterFactory';
import CharacterGroup from './../../character/CharacterGroup';

import sky from './../../../assets/sky.png';
import platform from './../../../assets/platform.png';
import dude from './../../../assets/dude.png';

class VillageScene extends Phaser.Scene {
  preload() {
    this.load.image('sky', sky);
    this.load.image('ground', platform);
    this.load.spritesheet('dude', dude, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    const socket = io('http://localhost:3001/');

    const villageMap = MapFactory.getVillage(this);
    const characterFactory = new CharacterFactory(this);
    const characterGroup = new CharacterGroup(this);

    socket.on('currentCharacter', (characters) => {
      Object.keys(characters).forEach((index) => {
        if (characters[index].socketId === socket.id) {
          const myCharacter = characterFactory.getMyCharacter(
            characters[index].xCoordinate,
            characters[index].yCoordinate,
            'dude',
            socket.id,
            (character) => {
              socket.emit('characterMovement', {
                xCoordinate: character.x,
                yCoordinate: character.y,
                animation: character.anims.getName(),
              });
            }
          );

          this.physics.add.collider(myCharacter, villageMap);
        } else {
          characterGroup.add(
            characterFactory.getAnotherCharacter(
              characters[index].xCoordinate,
              characters[index].yCoordinate,
              'dude',
              characters[index].socketId,
              characters[index].animation
            )
          );
        }
      });
    });

    socket.on('newCharacter', (characterInfo) => {
      characterGroup.add(
        characterFactory.getAnotherCharacter(
          characterInfo.xCoordinate,
          characterInfo.yCoordinate,
          'dude',
          characterInfo.socketId,
          characterInfo.animation
        )
      );
    });

    socket.on('characterMoved', (characterInfo) => {
      const movedCharacter = characterGroup.find(characterInfo.socketId);

      movedCharacter.setPosition(
        characterInfo.xCoordinate,
        characterInfo.yCoordinate
      );

      movedCharacter.anims.play(characterInfo.animation, true);
    });

    socket.on('characterDisconnect', (socketId) => {
      characterGroup.remove(socketId);
    });
  }
}

export default VillageScene;