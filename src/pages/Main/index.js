import React from 'react';

import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import backgroundVideo from '@/assets/backgroundVideo.mp4';

import './main.css';

const Main = () => {
  const history = useHistory();

  const clickStartBtn = () => history.push('/game');

  return (
    <div className="main">
      <div className="main__background-video-wrapper">
        <video
          className="main__background-video"
          autoPlay
          muted
          loop
          src={backgroundVideo}
          type="video/mp4"
        >
          <track kind="captions" />
        </video>
      </div>

      <div className="main__main-component-wrapper">
        <div className="main__main-component">
          <div className="main__main-component__name">Antique Universe</div>
          <div className="main__main-component__des">너와 내가 신뢰로 연결되는 세상</div>
          <div className="main__start-btn">
            <Button
              style={{
                color: '#FFFFFF',
                width: '150px',
              }}
              onClick={clickStartBtn}
            >
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
