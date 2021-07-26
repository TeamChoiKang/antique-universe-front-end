import { REDIRECT_URI, KAKAO_OAUTH_URI, KAKAO_REST_API_KEY } from '@/constants';
import http from '@/package/http';
import queryString from '@/package/queryString';

import OauthStrategy from './OauthStrategy';

class KaKaoOauthStrategy extends OauthStrategy {
  requestCode() {
    const codeRequestUri = `${KAKAO_OAUTH_URI}/authorize`;
    const codeRequest = {
      client_id: KAKAO_REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
    };
    const query = queryString.stringify(codeRequest);

    window.open(`${codeRequestUri}?${query}`, '_self');
  }

  async requestToken(code) {
    const tokenRequestUri = `${KAKAO_OAUTH_URI}/token`;
    const tokenReqeust = {
      grant_type: 'authorization_code',
      client_id: KAKAO_REST_API_KEY,
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
