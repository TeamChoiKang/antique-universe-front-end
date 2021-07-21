import React, { useState, useEffect, useRef } from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useLocation } from 'react-router-dom';

import queryString from '@/package/queryString';

import antiqueUniverseLogo from '../../assets/antique-universe-logo.png';

import KaKaoOauthStrategy from './KaKaoOauthStrategy';
import OauthStrategy from './OauthStrategy';

import './signin.css';

const KAKAO_VENDOR = 'KAKAO';

const SignIn = () => {
  const location = useLocation();
  const [staySigninState, setStaySigninState] = useState(false);
  const oauthStrategy = useRef(new OauthStrategy());
  const { code } = queryString.parse(location.search);
  const vendor = window.localStorage.getItem('vendor');

  useEffect(() => {
    if (vendor === KAKAO_VENDOR) {
      oauthStrategy.current = new KaKaoOauthStrategy();
    } else {
      oauthStrategy.current = new OauthStrategy();
    }
  }, [vendor]);

  useEffect(() => {
    if (code) {
      (async () => {
        const token = await oauthStrategy.current.requestToken(code);
        console.log(token);
      })();
    }
  }, [code]);

  const clickSigninBtn = () => {
    oauthStrategy.current.requestCode();
  };
  const clickKakaoSigninBtn = () => {
    window.localStorage.setItem('vendor', KAKAO_VENDOR);
    clickSigninBtn();
  };
  const clickStaySigninCheckbox = () => {
    setStaySigninState(!staySigninState);
  };

  return (
    <div className="signin">
      <div className="signin__main-component">
        <div className="signin__logo">
          <img src={antiqueUniverseLogo} alt="antique-universe-logo" />
        </div>
        <div className="signin__signin-btn kakao-signin-btn">
          <Button variant="contained" color="primary" onClick={clickKakaoSigninBtn} fullWidth>
            카카오로 로그인하기
          </Button>
        </div>
        <div className="signin__check-box">
          <FormControlLabel
            control={
              <Checkbox
                name="staySignedIn"
                color="primary"
                checked={staySigninState}
                onChange={clickStaySigninCheckbox}
              />
            }
            label="로그인 유지"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
