import Validator from './Validator';

class NumberValidator extends Validator {
  isValid(value) {
    if (Number.isNaN(Number(value))) {
      return {
        error: true,
        errorReason: '숫자만 입력해주세요',
      };
    }
    return super.isValid(value);
  }
}

export default NumberValidator;
