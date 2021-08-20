import Validator from './Validator';

class RequiredValidator extends Validator {
  isValid(value) {
    if (!value) {
      return {
        error: true,
        errorReason: '필수 입력 항목입니다',
      };
    }
    return super.isValid(value);
  }
}

export default RequiredValidator;
