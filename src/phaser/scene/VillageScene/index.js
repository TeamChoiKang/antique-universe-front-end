import Phaser from './../../../package/phaser';
import io from './../../../package/socket';

import createVillageMap from './../../map/createVillageMap';
import {
  createMyCharacterWithDefaultSetup,
  createAnotherCharacterWithDefaultSetup,
} from './../../character/createCharacter';

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

    const villageMap = createVillageMap(this);
    const anotherCharacterGroup = this.physics.add.group({
      allowGravity: false,
    });

    const createAnotherCharacterAndAppendToGroup = (characterInfo) => {
      const anotherCharacter = createAnotherCharacterWithDefaultSetup(
        this,
        characterInfo.xCoordinate,
        characterInfo.yCoordinate,
        'dude',
        characterInfo.socketId,
        characterInfo.animation
      );

      anotherCharacterGroup.add(anotherCharacter);
    };

    socket.on('currentCharacter', (characters) => {
      Object.keys(characters).forEach((index) => {
        if (characters[index].socketId === socket.id) {
          const myCharacter = createMyCharacterWithDefaultSetup(
            this,
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
          createAnotherCharacterAndAppendToGroup(characters[index]);
        }
      });
    });

    socket.on('newCharacter', (characterInfo) => {
      createAnotherCharacterAndAppendToGroup(characterInfo);
    });

    socket.on('characterMoved', (characterInfo) => {
      anotherCharacterGroup.getChildren().forEach((anotherCharacter) => {
        if (characterInfo.socketId === anotherCharacter.socketId) {
          anotherCharacter.setPosition(
            characterInfo.xCoordinate,
            characterInfo.yCoordinate
          );

          anotherCharacter.anims.play(characterInfo.animation, true);
        }
      });
    });

    socket.on('characterDisconnect', (socketId) => {
      anotherCharacterGroup.getChildren().forEach((anotherCharacter) => {
        if (socketId === anotherCharacter.socketId) {
          anotherCharacter.destroy();
        }
      });
    });
  }
}

export default VillageScene;
