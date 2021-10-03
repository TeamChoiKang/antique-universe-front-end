// import dude from '@/assets/dude.png';
// import sky from '@/assets/real-sky.png';
// import TileSet from '@/assets/tile-set.png';
// import VillageTileMap from '@/assets/tileMap/village/village-tile-map.json';
// import Phaser from '@/package/phaser';
// import CharacterFactory from '@/phaser/character/CharacterFactory';
// import CharacterGroup from '@/phaser/character/CharacterGroup';
// import * as sceneKeys from '@/phaser/scene/sceneKeys';
// import SceneManager from '@/phaser/scene/SceneManager';
// import SocketManager from '@/utils/socket/SocketManager';

// const BACKGROUND_KEY = 'backgroud';
// const VILLAGE_TILE_MAP_KEY = 'villageTileMap';
// const TILE_SET_KEY = 'tileSet';
// const SPRITE_SHEET_KEY = 'dude';

// class VillageScene extends Phaser.Scene {
//   constructor() {
//     super(sceneKeys.VILLAGE_SCENE_KEY);
//   }

//   preload() {
//     this.load.image(TILE_SET_KEY, TileSet);
//     this.load.tilemapTiledJSON(VILLAGE_TILE_MAP_KEY, VillageTileMap);
//     this.load.image(BACKGROUND_KEY, sky);
//     this.load.spritesheet(SPRITE_SHEET_KEY, dude, {
//       frameWidth: 32,
//       frameHeight: 48,
//     });
//   }

//   create() {
//     const socket = new SocketManager();
//     const sceneWithTileMap = SceneManager.setTileMap(
//       this,
//       BACKGROUND_KEY,
//       VILLAGE_TILE_MAP_KEY,
//       TILE_SET_KEY,
//     );
//     const characterFactory = new CharacterFactory(this);
//     const characterGroup = new CharacterGroup(this);
//     const createAnotherCharacterAndAppendToCharacterGroup = characterInfo => {
//       const anotherCharacter = characterFactory.getAnotherCharacter(
//         characterInfo.x,
//         characterInfo.y,
//         SPRITE_SHEET_KEY,
//         characterInfo.socketId,
//         characterInfo.animation,
//       );

//       characterGroup.add(anotherCharacter);
//     };

//     this.cameras.main.setBounds(0, 0, sceneWithTileMap.width, sceneWithTileMap.height);
//     this.cameras.main.setZoom(1.5);

//     const sceneChangeKey = this.input.keyboard.addKey('c');
//     sceneChangeKey.on('down', () => {
//       socket.removeAllListeners();
//       SceneManager.changeScene(this, sceneKeys.SHOP_SCENE_KEY);
//     });

//     socket.emit('map:join', 'village');

//     socket.emit('character:start', 'start');

//     socket.once('character:myCharacter', myCharacterInfo => {
//       const myCharacter = characterFactory.getGmCharacter(
//         myCharacterInfo.x,
//         myCharacterInfo.y,
//         SPRITE_SHEET_KEY,
//         socket.id,
//         character => {
//           socket.emit('character:move', {
//             x: character.x,
//             y: character.y,
//             animation: character.anims.getName(),
//           });
//         },
//       );

//       this.physics.add.collider(myCharacter, sceneWithTileMap);
//       this.cameras.main.startFollow(myCharacter, true, 0.5, 0.5);
//     });

//     socket.once('character:currentCharacter', characters => {
//       Object.keys(characters).forEach(index => {
//         createAnotherCharacterAndAppendToCharacterGroup(characters[index]);
//       });
//     });

//     socket.on('character:newCharacter', characterInfo => {
//       createAnotherCharacterAndAppendToCharacterGroup(characterInfo);
//     });

//     socket.on('character:moved', characterInfo => {
//       const movedCharacter = characterGroup.find(characterInfo.socketId);

//       if (!movedCharacter) return;
//       movedCharacter.setPosition(characterInfo.x, characterInfo.y);
//       movedCharacter.anims.play(characterInfo.animation, true);
//     });

//     socket.on('character:disconnection', socketId => {
//       characterGroup.remove(socketId);
//     });
//   }
// }

// export default VillageScene;

import dude from '@/assets/dude.png';
import sky from '@/assets/real-sky.png';
import TileSet from '@/assets/tile-set.png';
import VillageTileMap from '@/assets/tileMap/village/village-tile-map.json';
import Phaser from '@/package/phaser';
import CharacterFactory from '@/phaser/character/CharacterFactory';
import CharacterGroup from '@/phaser/character/CharacterGroup';
import * as sceneKeys from '@/phaser/scene/sceneKeys';
import SceneManager from '@/phaser/scene/SceneManager';
import SocketManager from '@/utils/socket/SocketManager';

const BACKGROUND_KEY = 'backgroud';
const VILLAGE_TILE_MAP_KEY = 'villageTileMap';
const TILE_SET_KEY = 'tileSet';
const SPRITE_SHEET_KEY = 'dude';

// const GOOGLE_STUN_SERVER_URL = 'stun:stun.l.google.com:19302';
const CONFIGURATION = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
};

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

    this.cameras.main.setBounds(0, 0, sceneWithTileMap.width, sceneWithTileMap.height);
    this.cameras.main.setZoom(1.5);

    const sceneChangeKey = this.input.keyboard.addKey('c');
    sceneChangeKey.on('down', () => {
      socket.removeAllListeners();
      SceneManager.changeScene(this, sceneKeys.SHOP_SCENE_KEY);
    });

    socket.emit('map:join', 'village');

    socket.emit('character:start', 'start');

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

    // testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest

    const receiverPeerConnectionMap = new Map();

    const createSenderPeerConnection = stream => {
      const senderPeerConnection = new RTCPeerConnection(CONFIGURATION);

      senderPeerConnection.onicecandidate = ({ candidate }) => {
        if (!candidate) return;
        socket.emit('webRtcAudio:senderIceCandidate', candidate);
      };

      stream.getTracks().forEach(track => {
        senderPeerConnection.addTrack(track, stream);
      });

      return senderPeerConnection;
    };

    const createSenderOffer = async senderPeerConnection => {
      const offer = await senderPeerConnection.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      });
      await senderPeerConnection.setLocalDescription(offer);
      return offer;
    };

    const appendAudio = stream => {
      const audio = document.createElement('audio');
      audio.srcObject = stream;
      audio.play();
      document.body.appendChild(audio);
    };

    const createReceiverPeerConnection = socketId => {
      const receiverPeerConnection = new RTCPeerConnection(CONFIGURATION);

      receiverPeerConnection.onicecandidate = ({ candidate }) => {
        if (!candidate) return;
        socket.emit('webRtcAudio:receiverIceCandidate', { candidate, socketId });
      };

      receiverPeerConnection.ontrack = ({ streams }) => {
        console.log('ontrack success');
        appendAudio(streams[0]);
      };

      return receiverPeerConnection;
    };

    const createReceiverOffer = async receiverPeerConnection => {
      const offer = await receiverPeerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await receiverPeerConnection.setLocalDescription(offer);
      return offer;
    };

    socket.on('webRtcAudio:receiverAnswer', async ({ answer, socketId }) => {
      const audioReceiverPeerConnection = receiverPeerConnectionMap.get(socketId);
      await audioReceiverPeerConnection.setRemoteDescription(answer);
    });

    socket.on('webRtcAudio:receiverIceCandidate', async ({ iceCandidate, socketId }) => {
      const audioReceiverPeerConnection = receiverPeerConnectionMap.get(socketId);
      await audioReceiverPeerConnection.addIceCandidate(iceCandidate);
    });

    const connectReceiverPeer = async socketId => {
      const audioReceiverPeerConnection = createReceiverPeerConnection(socketId);

      receiverPeerConnectionMap.set(socketId, audioReceiverPeerConnection);

      const offer = await createReceiverOffer(audioReceiverPeerConnection);
      socket.emit('webRtcAudio:receiverOffer', { offer, socketId });
    };

    const webRtcStart = async () => {
      let audioSenderPeerConnection;

      socket.on('webRtcAudio:senderAnswer', async answer => {
        await audioSenderPeerConnection.setRemoteDescription(answer);
      });

      socket.on('webRtcAudio:senderIceCandidate', async iceCandidate => {
        await audioSenderPeerConnection.addIceCandidate(iceCandidate);
      });

      socket.on('webRtcAudio:currentSender', socketIdList => {
        socketIdList.forEach(socketId => connectReceiverPeer(socketId));
      });

      socket.on('webRtcAudio:newSender', socketId => connectReceiverPeer(socketId));

      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioSenderPeerConnection = createSenderPeerConnection(audioStream);
      const offer = await createSenderOffer(audioSenderPeerConnection);
      socket.emit('webRtcAudio:senderOffer', offer);
    };

    webRtcStart();
  }
}

export default VillageScene;
