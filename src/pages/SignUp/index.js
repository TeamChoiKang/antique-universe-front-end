import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory, useLocation } from 'react-router-dom';

import './signup.css';
import AuthService from '@/api/AuthService';
import produce from '@/package/immutable';
import KoreanValidator from '@/utils/validation/KoreanValidator';
import LengthValidator from '@/utils/validation/LengthValidator';
import NumberValidator from '@/utils/validation/NumberValidator';
import RequiredValidator from '@/utils/validation/RequiredValidator';
import ValidatorChainBuilder from '@/utils/validation/ValidatorChainBuilder';

const SignUp = () => {
  const location = useLocation();
  const history = useHistory();
  const { vendor, oAuthToken } = location.state;
  const [form, setForm] = useState({
    name: {
      value: '',
      placeholder: '이름을 입력해주세요',
      validators: new ValidatorChainBuilder()
        .add(new RequiredValidator())
        .add(new KoreanValidator())
        .add(new LengthValidator(1, 20))
        .getFirst(),
      error: false,
      errorReason: '',
    },
    nickname: {
      value: '',
      placeholder: '20자 이내의 닉네임을 입력해주세요',
      validators: new ValidatorChainBuilder()
        .add(new RequiredValidator())
        .add(new LengthValidator(1, 20))
        .getFirst(),
      error: false,
      errorReason: '',
    },
    phone: {
      value: '',
      placeholder: '-를 제외한 휴대폰 번호를 입력해주세요',
      validators: new ValidatorChainBuilder()
        .add(new RequiredValidator())
        .add(new NumberValidator())
        .add(new LengthValidator(1, 11))
        .getFirst(),
      error: false,
      errorReason: '',
    },
    age: {
      value: '',
      placeholder: '나이를 입력해주세요',
      validators: new ValidatorChainBuilder()
        .add(new RequiredValidator())
        .add(new NumberValidator())
        .add(new LengthValidator(1, 2))
        .getFirst(),
      error: false,
      errorReason: '',
    },
  });

  const validateInput = (validators, value) => {
    return validators.isValid(value);
  };

  const changeInput = (name, value, error, errorReason) => {
    setForm(
      produce(draft => {
        draft[name].value = value;
        draft[name].error = error;
        draft[name].errorReason = errorReason;
      }),
    );
  };

  const validateAllInput = () => {
    let isAllValid = true;
    for (const [name, { value, validators }] of Object.entries(form)) {
      const { error, errorReason } = validateInput(validators, value);
      if (error) {
        isAllValid = false;
      }
      changeInput(name, value, error, errorReason);
    }
    return isAllValid;
  };

  const requestSignup = async () => {
    const signUpInfo = {
      name: form.name.value,
      nickname: form.nickname.value,
      phone: form.phone.value,
      age: form.age.value,
    };
    const token = await AuthService.signup(vendor, oAuthToken, signUpInfo);
    return token;
  };

  const setTokenIntoStorage = token => {
    const staySigninState = sessionStorage.getItem('staySigninState');
    if (staySigninState) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  };

  const onChange = e => {
    const { name, value } = e.target;
    const { error, errorReason } = validateInput(form[name].validators, value);
    changeInput(name, value, error, errorReason);
  };

  const onSubmit = async () => {
    const isAllValid = validateAllInput();
    if (isAllValid) {
      const token = await requestSignup();
      setTokenIntoStorage(token);
      history.push('/game');
    }
  };

  return (
    <div className="signup">
      <div className="signup__main-component">
        <TextField
          className="signup__name-input signup__input"
          label="이름"
          name="name"
          variant="outlined"
          value={form.name.value}
          error={form.name.error}
          placeholder={form.name.placeholder}
          helperText={form.name.errorReason}
          onChange={onChange}
        />
        <TextField
          className="signup__nickname-input signup__input"
          label="닉네임"
          name="nickname"
          variant="outlined"
          value={form.nickname.value}
          error={form.nickname.error}
          placeholder={form.nickname.placeholder}
          helperText={form.nickname.errorReason}
          onChange={onChange}
        />
        <TextField
          className="signup__phone-input signup__input"
          label="휴대전화"
          name="phone"
          variant="outlined"
          value={form.phone.value}
          error={form.phone.error}
          placeholder={form.phone.placeholder}
          helperText={form.phone.errorReason}
          onChange={onChange}
        />
        <TextField
          className="signup__age-input signup__input"
          label="나이"
          name="age"
          variant="outlined"
          value={form.age.value}
          error={form.age.error}
          placeholder={form.age.placeholder}
          helperText={form.age.errorReason}
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
