import React from 'react';

import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import antiqueUniverseLogo from '../../assets/antique-universe-logo.png';

import './main.css';

const Main = () => {
  const history = useHistory();

  const clickStartBtn = () => history.push('/game');

  return (
    <div className="main">
      <div className="main__main-component">
        <div className="main__logo">
          <img src={antiqueUniverseLogo} alt="antique-universe-logo" />
        </div>
        <div className="main__start-btn">
          <Button variant="contained" color="primary" onClick={clickStartBtn}>
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
