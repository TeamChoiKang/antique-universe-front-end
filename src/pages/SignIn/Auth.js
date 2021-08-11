const { default: AuthService } = require('@/api/AuthService');

class Auth {
  async signin(vendor, token) {
    const user = await AuthService.signin(vendor, token);
    return user;
  }
}

export default Auth;
