import React, { useContext, useEffect } from 'react';

import PhaserRender from '@/components/PhaserRender';

import './game.css';
import UserContext from '@/contexts/user';
import Socket from '@/utils/socket';

const Game = () => {
  const { state } = useContext(UserContext);

  useEffect(() => {
    Socket.connect(state.user.userId);
  }, [state]);

  return (
    <div className="game">
      <PhaserRender />
    </div>
  );
};

export default Game;
