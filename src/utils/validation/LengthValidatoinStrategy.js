const { default: ValidationStrategy } = require('./ValidationStrategy');

class LengthValidationStrategy extends ValidationStrategy {
  constructor(minLength = 0, maxLength = 1000) {
    super();
    this._minLength = minLength;
    this._maxLength = maxLength;
  }

  validate(value) {
    const isPassMinLength = String(value).length >= this._minLength;
    const isPassMaxLength = String(value).length <= this._maxLength;

    return {
      error: !isPassMinLength || !isPassMaxLength,
      errorReason: `${this._minLength}자리 이상 ${this._maxLength} 이하로 입력해주세요`,
    };
  }
}

export default LengthValidationStrategy;
