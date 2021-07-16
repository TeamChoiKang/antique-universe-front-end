import dude from '@/assets/dude.png';
import platform from '@/assets/platform.png';
import sky from '@/assets/real-sky.png';
import Phaser from '@/package/phaser';
import io from '@/package/socket';
import CharacterFactory from '@/phaser/character/CharacterFactory';
import CharacterGroup from '@/phaser/character/CharacterGroup';
import DefaultMapBuilder from '@/phaser/map/builder/DefaultMapBuilder';
import MapManager from '@/phaser/map/MapManager';

class VillageScene extends Phaser.Scene {
  preload() {
    this.load.image('defaultBackground', sky);
    this.load.image('defaultGround', platform);
    this.load.spritesheet('dude', dude, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    const socket = io('http://localhost:3001/');

    const villageMap = MapManager.createVillageMap(new DefaultMapBuilder(this));
    const characterFactory = new CharacterFactory(this);
    const characterGroup = new CharacterGroup(this);

    const MAP_WIDTH = 3840;
    const MAP_HEIGHT = 2160;

    this.physics.world.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);
    this.cameras.main.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);
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
