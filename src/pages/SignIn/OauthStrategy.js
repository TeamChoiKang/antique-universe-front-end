class OauthStrategy {
  /**
   * abstract
   */
  requestCode() {
    return new Error('cannot use abstract requestCode method');
  }

  /**
   * abstract
   * @params code oauth service가 발급해준 인가 코드
   */
  requestToken(code) {
    return new Error('cannot use abstract requestToken method');
  }
}

export default OauthStrategy;
