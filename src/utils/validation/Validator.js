class Validator {
  isValid(value) {
    if (this.nextValidator != null) {
      return this.nextValidator.isValid(value);
    }
    return {
      error: false,
      errorReason: '',
    };
  }

  setNextValidator(validator) {
    this.nextValidator = validator;
  }
}

export default Validator;
