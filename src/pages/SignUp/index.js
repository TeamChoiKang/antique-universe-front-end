import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useLocation } from 'react-router-dom';

import './signup.css';

const SignUp = () => {
  const location = useLocation();
  const { vendor, oAuthToken } = location.state;
  const [signUpInfo, setSignUpInfo] = useState({
    name: '',
    nickname: '',
    phone: '',
    age: '',
  });

  const onChange = e => {
    setSignUpInfo({
      ...setSignUpInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {};

  return (
    <div className="signup">
      <div className="signup__main-component">
        <TextField
          id="outlined-basic"
          className="signup__name-input signup__input"
          label="이름"
          name="name"
          variant="outlined"
          value={signUpInfo.name}
          onChange={onChange}
        />
        <TextField
          id="outlined-basic"
          className="signup__nickname-input signup__input"
          label="닉네임"
          name="nickname"
          variant="outlined"
          value={signUpInfo.nickname}
          onChange={onChange}
        />
        <TextField
          id="outlined-basic"
          className="signup__phone-input signup__input"
          label="휴대전화"
          name="phone"
          variant="outlined"
          value={signUpInfo.phone}
          onChange={onChange}
        />
        <TextField
          id="outlined-basic"
          className="signup__age-input signup__input"
          label="나이"
          name="age"
          variant="outlined"
          value={signUpInfo.age}
          onChange={onChange}
        />
        <Button
          className="signup__signup-btn"
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
