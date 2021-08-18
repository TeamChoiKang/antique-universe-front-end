const { default: ValidationStrategy } = require('./ValidationStrategy');

class NumberValidationStrategy extends ValidationStrategy {
  validate(value) {
    return {
      error: Number.isNaN(Number(value)),
      errorReason: '숫자만 입력해주세요',
    };
  }
}

export default NumberValidationStrategy;
