import React, { useState, useEffect, useRef } from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useLocation, useHistory } from 'react-router-dom';

import antiqueUniverseLogo from '@/assets/antique-universe-logo.png';
import { KAKAO_VENDOR } from '@/constants';
import queryString from '@/package/queryString';

import AuthFactory from './AuthFactory';
import './signin.css';

const SignIn = () => {
  const location = useLocation();
  const history = useHistory();
  const [staySigninState, setStaySigninState] = useState(
    !!sessionStorage.getItem('staySigninState'),
  );
  const vendor = sessionStorage.getItem('vendor');
  const { code: oAuthCode } = queryString.parse(location.search);
  const auth = useRef(AuthFactory(vendor));

  useEffect(() => {
    if (oAuthCode) {
      (async () => {
        const oAuthToken = await auth.current.requestOAuthToken(oAuthCode);
        const token = await auth.current.signin(vendor, oAuthToken);
        setTokenIntoStorage(token);
        history.push('/game');
      })();
    }
  }, [oAuthCode, staySigninState]);

  const setTokenIntoStorage = token => {
    if (staySigninState) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  };

  const clickSigninBtn = newVendor => {
    sessionStorage.setItem('vendor', newVendor);
    auth.current = AuthFactory(newVendor);
    auth.current.requestOAuthCode();
  };

  const clickStaySigninCheckbox = () => {
    sessionStorage.setItem('staySigninState', !staySigninState);
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
