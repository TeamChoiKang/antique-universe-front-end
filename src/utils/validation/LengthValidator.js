import Validator from './Validator';

class LengthValidator extends Validator {
  constructor(minLength = 0, maxLength = 1000) {
    super();
    this._minLength = minLength;
    this._maxLength = maxLength;
  }

  isValid(value) {
    const isPassMinLength = String(value).length >= this._minLength;
    const isPassMaxLength = String(value).length <= this._maxLength;
    if (!isPassMinLength || !isPassMaxLength) {
      return {
        error: true,
        errorReason: `${this._minLength}자리 이상 ${this._maxLength}자리 이하로 입력해주세요`,
      };
    }
    return super.isValid(value);
  }
}

export default LengthValidator;
