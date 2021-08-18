const { default: ValidationStrategy } = require('./ValidationStrategy');

class KoreanValidationStrategy extends ValidationStrategy {
  validate(value) {
    let error = false;
    for (const char of value) {
      const uni = char.charCodeAt(0);
      if (!(uni >= 12593 && uni <= 12643) && !(uni >= 44032 && uni <= 55203)) {
        error = true;
        break;
      }
    }
    return {
      error,
      errorReason: '한글만 입력해주세요',
    };
  }
}

export default KoreanValidationStrategy;
