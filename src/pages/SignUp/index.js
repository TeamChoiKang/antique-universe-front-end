import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory, useLocation } from 'react-router-dom';

import './signup.css';
import AuthService from '@/api/AuthService';
import produce from '@/package/immutable';
import KoreanValidationStrategy from '@/utils/validation/KoreanValidationStrategy';
import LengthValidationStrategy from '@/utils/validation/LengthValidatoinStrategy';
import NumberValidationStrategy from '@/utils/validation/NumberValidationStrategy';
import RequiredValidationStrategy from '@/utils/validation/RequiredValidationStrategy';

const SignUp = () => {
  const location = useLocation();
  const history = useHistory();
  const { vendor, oAuthToken } = location.state;
  const [signUpInfo, setSignUpInfo] = useState({
    name: {
      value: '',
      placeholder: '이름을 입력해주세요',
      validations: [
        new RequiredValidationStrategy(),
        new KoreanValidationStrategy(),
        new LengthValidationStrategy(1, 20),
      ],
      error: false,
      errorReason: '',
    },
    nickname: {
      value: '',
      placeholder: '20자 이내의 닉네임을 입력해주세요',
      validations: [new RequiredValidationStrategy(), new LengthValidationStrategy(1, 20)],
      error: false,
      errorReason: '',
    },
    phone: {
      value: '',
      placeholder: '-를 제외한 휴대폰 번호를 입력해주세요',
      validations: [
        new RequiredValidationStrategy(),
        new NumberValidationStrategy(),
        new LengthValidationStrategy(1, 11),
      ],
      error: false,
      errorReason: '',
    },
    age: {
      value: '',
      placeholder: '나이를 입력해주세요',
      validations: [
        new RequiredValidationStrategy(),
        new NumberValidationStrategy(),
        new LengthValidationStrategy(1, 2),
      ],
      error: false,
      errorReason: '',
    },
  });

  const validateInput = (validations, value) => {
    for (const validation of validations) {
      const { error, errorReason } = validation.validate(value);
      if (error) {
        return { error, errorReason };
      }
    }
    return {
      error: false,
      errorReason: '',
    };
  };

  const changeInput = (name, value, error, errorReason) => {
    setSignUpInfo(
      produce(draft => {
        draft[name].value = value;
        draft[name].error = error;
        draft[name].errorReason = errorReason;
      }),
    );
  };

  const validateAllInput = () => {
    let isAllValid = true;
    for (const [name, { value, validations }] of Object.entries(signUpInfo)) {
      const { error, errorReason } = validateInput(validations, value);
      if (error) {
        isAllValid = false;
      }
      changeInput(name, value, error, errorReason);
    }
    return isAllValid;
  };

  const onChange = e => {
    const { name, value } = e.target;
    const { error, errorReason } = validateInput(signUpInfo[name].validations, value);
    changeInput(name, value, error, errorReason);
  };

  const onSubmit = async () => {
    const isAllValid = validateAllInput();
    if (isAllValid) {
      const token = await AuthService.signup(vendor, oAuthToken, signUpInfo);
      const staySigninState = sessionStorage.getItem('staySigninState');
      if (staySigninState) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      history.push('/game');
    }
  };

  return (
    <div className="signup">
      <div className="signup__main-component">
        <TextField
          id="outlined-error-helper-text"
          className="signup__name-input signup__input"
          label="이름"
          name="name"
          variant="outlined"
          value={signUpInfo.name.value}
          error={signUpInfo.name.error}
          placeholder={signUpInfo.name.placeholder}
          helperText={signUpInfo.name.errorReason}
          onChange={onChange}
        />
        <TextField
          id="outlined-error-helper-text"
          className="signup__nickname-input signup__input"
          label="닉네임"
          name="nickname"
          variant="outlined"
          value={signUpInfo.nickname.value}
          error={signUpInfo.nickname.error}
          placeholder={signUpInfo.nickname.placeholder}
          helperText={signUpInfo.nickname.errorReason}
          onChange={onChange}
        />
        <TextField
          id="outlined-error-helper-text"
          className="signup__phone-input signup__input"
          label="휴대전화"
          name="phone"
          variant="outlined"
          value={signUpInfo.phone.value}
          error={signUpInfo.phone.error}
          placeholder={signUpInfo.phone.placeholder}
          helperText={signUpInfo.phone.errorReason}
          onChange={onChange}
        />
        <TextField
          id="outlined-error-helper-text"
          className="signup__age-input signup__input"
          label="나이"
          name="age"
          variant="outlined"
          value={signUpInfo.age.value}
          error={signUpInfo.age.error}
          placeholder={signUpInfo.age.placeholder}
          helperText={signUpInfo.age.errorReason}
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
