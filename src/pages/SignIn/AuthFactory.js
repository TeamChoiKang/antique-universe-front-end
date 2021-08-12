import { KAKAO_VENDOR } from '@/constants';

import KaKaoOAuth from './KaKaoOAuth';
import OAuth from './OAuth';

const AuthFactory = vendor => {
  switch (vendor) {
    case KAKAO_VENDOR:
      return new KaKaoOAuth();
    default:
      return new OAuth();
  }
};

export default AuthFactory;
