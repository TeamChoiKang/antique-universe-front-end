class OauthStrategy {
  /**
   * abstract
   */
  requestCode() {}

  /**
   * abstract
   * @params code oauth service가 발급해준 인가 코드
   */
  requestToken(code) {}
}

export default OauthStrategy;
