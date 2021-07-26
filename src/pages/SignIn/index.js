import React, { useState, useEffect, useRef } from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useLocation } from 'react-router-dom';

import antiqueUniverseLogo from '@/assets/antique-universe-logo.png';
import { KAKAO_VENDOR } from '@/constants';
import queryString from '@/package/queryString';

import KaKaoOauthStrategy from './KaKaoOauthStrategy';

import './signin.css';

const SignIn = () => {
  const location = useLocation();
  const [staySigninState, setStaySigninState] = useState(false);
  const oauthStrategy = useRef(null);
  const { code: oauthCode } = queryString.parse(location.search);
  const vendor = window.localStorage.getItem('vendor');

  useEffect(() => {
    if (vendor === KAKAO_VENDOR) {
      oauthStrategy.current = new KaKaoOauthStrategy();
    }
  }, [vendor]);

  useEffect(() => {
    if (oauthCode) {
      (async () => {
        const token = await oauthStrategy.current.requestToken(oauthCode);
        console.log(token);
      })();
    }
  }, [oauthCode]);

  const clickSigninBtn = newVendor => {
    // oauth callback 이슈로 인하여 vendor를 통해서 oauth 전략을 주입하도록 작업
    window.localStorage.setItem('vendor', newVendor);
    oauthStrategy.current.requestOauthCode();
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => clickSigninBtn(KAKAO_VENDOR)}
            fullWidth
          >
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
