// oauth
export const REDIRECT_URI = `${document.location.origin}/signin`;

export const KAKAO_VENDOR = 'KAKAO';
export const KAKAO_OAUTH_URI = 'https://kauth.kakao.com/oauth';
export const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

// server
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const API_SERVER_URL = `${SERVER_URL}`;
export const SOCKET_SERVER_URL = `${SERVER_URL}`; // socket.io path가 자동으로 추가되므로 생략
