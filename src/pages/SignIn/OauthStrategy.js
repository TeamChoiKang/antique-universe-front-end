class OauthStrategy {
  /**
   * abstract
   */
  requestOauthCode() {
    return new Error('cannot use abstract requestCode method');
  }

  /**
   * abstract
   * @params oauthCode oauth service가 발급해준 인가 코드
   */
  requestToken(oauthCode) {
    return new Error('cannot use abstract requestToken method');
  }
}

export default OauthStrategy;
