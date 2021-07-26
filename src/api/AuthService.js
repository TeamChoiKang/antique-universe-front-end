import ApiService from '@/api/ApiService';

class AuthService extends ApiService {
  /**
   * oauth 서비스에게 token 값을 요청하는 api
   * @param url token 값을 요청하는 url
   * @param query grant_type, client_id, REDIRECT_URI, oauthCode
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
}

export default new AuthService();
