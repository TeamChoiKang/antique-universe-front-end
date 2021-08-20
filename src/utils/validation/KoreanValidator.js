import Validator from './Validator';

class KoreanValidator extends Validator {
  isValid(value) {
    for (const char of value) {
      const uni = char.charCodeAt(0);
      if (!(uni >= 12593 && uni <= 12643) && !(uni >= 44032 && uni <= 55203)) {
        return {
          error: true,
          errorReason: '한글만 입력해주세요',
        };
      }
    }
    return super.isValid(value);
  }
}

export default KoreanValidator;
