const createCharacterAnimation = (animation) => {
  animation.create({
    key: 'left',
    frames: animation.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  animation.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20,
  });

  animation.create({
    key: 'right',
    frames: animation.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  return animation;
};

export default createCharacterAnimation;
