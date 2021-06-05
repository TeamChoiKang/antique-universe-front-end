import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import antiqueUniverseLogo from './../../assets/antique-universe-logo.png';

import './signin.css';

const SignIn = () => {
  const [staySigninState, setStaySigninState] = useState(false);

  const handleStaySigninCheckboxChange = () =>
    setStaySigninState(!staySigninState);

  return (
    <div className="signin">
      <div className="signin__main-component">
        <div className="signin__logo">
          <img src={antiqueUniverseLogo} alt="antique-universe-logo" />
        </div>
        <div className="signin__signin-btn kakao-signin-btn">
          <Button variant="contained" color="primary" fullWidth>
            카카오로 로그인하기
          </Button>
        </div>
        <div className="signin__signin-btn naver-signin-btn">
          <Button variant="contained" color="primary" fullWidth>
            네이버로 로그인하기
          </Button>
        </div>
        <div className="signin__check-box">
          <FormControlLabel
            control={
              <Checkbox
                name="staySignedIn"
                color="primary"
                checked={staySigninState}
                onChange={handleStaySigninCheckboxChange}
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
