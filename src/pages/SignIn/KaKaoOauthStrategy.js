import AuthService from '@/api/AuthService';
import { REDIRECT_URI, KAKAO_OAUTH_URI, KAKAO_REST_API_KEY } from '@/constants';
import queryString from '@/package/queryString';

import OauthStrategy from './OauthStrategy';

class KaKaoOauthStrategy extends OauthStrategy {
  requestOauthCode() {
    const codeRequestUri = `${KAKAO_OAUTH_URI}/authorize`;
    const codeRequest = {
      client_id: KAKAO_REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
    };
    const query = queryString.stringify(codeRequest);

    window.open(`${codeRequestUri}?${query}`, '_self');
  }

  async requestOauthToken(oauthCode) {
    const tokenRequestUri = `${KAKAO_OAUTH_URI}/token`;
    const tokenReqeust = {
      grant_type: 'authorization_code',
      client_id: KAKAO_REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: oauthCode,
    };
    const query = queryString.stringify(tokenReqeust);

    const token = await AuthService.requestOauthToken(`${tokenRequestUri}?${query}`);
    return token;
  }
}

export default KaKaoOauthStrategy;
