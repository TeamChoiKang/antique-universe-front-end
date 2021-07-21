import http from '@/package/http';
import queryString from '@/package/queryString';

import OauthStrategy from './OauthStrategy';

const REDIRECT_URI = 'http://localhost:3000/signin';
const OAUTH_URI = 'https://kauth.kakao.com/oauth';
const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

class KaKaoOauthStrategy extends OauthStrategy {
  requestCode() {
    const codeRequestUri = `${OAUTH_URI}/authorize`;
    const codeRequest = {
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
    };
    const query = queryString.stringify(codeRequest);

    window.open(`${codeRequestUri}?${query}`, '_self');
  }

  async requestToken(code) {
    const tokenRequestUri = `${OAUTH_URI}/token`;
    const tokenReqeust = {
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code,
    };
    const query = queryString.stringify(tokenReqeust);
    const resp = await http.post(`${tokenRequestUri}?${query}`);
    const { access_token: accessToken } = await resp.json();

    return accessToken;
  }
}

export default KaKaoOauthStrategy;
