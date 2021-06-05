class CharacterGroup {
  constructor(scene) {
    this._group = scene.add.group();
  }

  find(socketId) {
    let character;

    this._group.getChildren().forEach(groupCharacter => {
      if (socketId === groupCharacter.socketId) {
        character = groupCharacter;
      }
    });

    return character;
  }

  add(character) {
    this._group.add(character);
  }

  remove(socketId) {
    let character = false;

    this._group.getChildren().forEach(groupCharacter => {
      if (socketId === groupCharacter.socketId) {
        character = groupCharacter;
        groupCharacter.destroy();
      }
    });

    return character;
  }
}

export default CharacterGroup;
