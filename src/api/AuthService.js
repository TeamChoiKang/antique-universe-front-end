import ApiService from '@/api/ApiService';
import queryString from '@/package/queryString';

class AuthService extends ApiService {
  /**
   * oauth 서비스에게 token 값을 요청하는 api
   * @param url token 값을 요청하는 url
   * @returns accessToken을 담은 Promise
   */
  async requestOauthToken(url) {
    try {
      const { access_token: accessToken } = await this._instance.post(url);
      return accessToken;
    } catch (error) {
      alert('oauth service가 불안정합니다. 관리자에게 문의해주세요.');
      return error;
    }
  }

  /**
   * oauth token을 통해서 로그인 하는 api
   * @param url token 값을 요청하는 url
   * @param vendor 이용한 oauth 의 vendor
   * @param oauthToken 발급한 oauth의 token
   * @returns 서버 자체 token을 담은 Promise
   */
  async signin(vendor, oauthToken) {
    try {
      const url = '/signin';
      const query = queryString.stringify({ vendor });
      const header = { Authorization: `Bearer ${oauthToken}` };
      const { token } = await this._instance.get(`${url}?${query}`, header);
      return token;
    } catch (error) {
      alert('토큰 발급이 성공적으로 이뤄지지 않았습니다. 관리자에게 문의해주세요.');
      return error;
    }
  }
}

export default new AuthService();
