import ApiService from '@/api/ApiService';
import queryString from '@/package/queryString';

class AuthService extends ApiService {
  /**
   * oauth 서비스에게 token 값을 요청하는 api
   * @param url token 값을 요청하는 url
   * @returns oAuthToken
   */
  async requestOAuthToken(url) {
    try {
      const { access_token: oAuthToken } = await this._instance.post(url);
      return oAuthToken;
    } catch (error) {
      alert('oauth service가 불안정합니다. 관리자에게 문의해주세요.');
      throw error;
    }
  }

  /**
   * oauth token을 통해서 로그인 하는 api
   * @param vendor 이용한 oauth 의 vendor
   * @param oAuthToken 발급한 oauth의 token
   * @returns 서버 자체 token
   */
  async signin(body) {
    try {
      const url = '/signin';
      const { token } = await this._instance.post(url, body);
      return token;
    } catch (error) {
      alert('유효한 회원이 아닙니다. 회원가입을 진행해주세요.');
      throw error;
    }
  }

  /**
   * oauth token을 통해서 회원가입을 하는 api
   * @param vendor 이용한 oauth 의 vendor
   * @param oAuthToken 발급한 oauth의 token
   * @param signupInfo 회원가입에서 필요한 추가 정보
   * @returns 서버 자체 token
   */
  async signup(vendor, oAuthToken, signUpInfo) {
    try {
      const url = '/signup';
      const body = {
        vendor,
        oAuthToken,
        signUpInfo,
      };
      const { token } = await this._instance.post(url, body);
      return token;
    } catch (error) {
      alert('회원가입이 성공적으로 이뤄지지 않았습니다. 관리자에게 문의해주세요.');
      throw error;
    }
  }

  /**
   * token을 검증하는 api
   * @param token 로그인 혹은 회원가입을 통해서 얻은 서버 고유 token
   * @returns token에 해당되는 user 정보
   */
  async validateToke(token) {
    try {
      const url = '/token';
      const header = {
        Authorization: `Bearer ${token}`,
      };
      const user = await this._instance.get(url, header);
      return user;
    } catch (error) {
      alert('토큰이 유효하지 않습니다. 관리자에게 문의해주세요.');
      throw error;
    }
  }
}

export default new AuthService();
