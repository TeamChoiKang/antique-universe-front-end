const { default: ValidationStrategy } = require('./ValidationStrategy');

class RequiredValidationStrategy extends ValidationStrategy {
  validate(value) {
    return {
      error: !value,
      errorReason: '필수 입력 항목입니다',
    };
  }
}

export default RequiredValidationStrategy;
