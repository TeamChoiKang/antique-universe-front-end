import React from 'react';

import PhaserRender from '@/components/PhaserRender';

import './game.css';
import Chat from '@/components/Chat';

const Game = () => {
  return (
    <div className="game">
      <PhaserRender />
      <Chat />
    </div>
  );
};

export default Game;
