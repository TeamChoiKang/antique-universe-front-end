import Auth from './Auth';

class OAuth extends Auth {
  requestOAuthCode() {
    return new Error();
  }

  requestOAuthToken() {
    return new Error();
  }
}

export default OAuth;
