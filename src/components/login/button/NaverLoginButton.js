import React, { useEffect } from 'react';
import axios from 'axios';

const NaverLoginButton = () => {
  useEffect(() => {
    const initNaverLogin = () => {
      const { naver } = window;
      if (naver) {
        const naverLogin = new naver.LoginWithNaverId({
          clientId: 'TooiyU0HesehTpxDkmE8',
          callbackUrl: 'http://localhost:3000/#/team4',
          isPopup: false,
          loginButton: { color: 'green', type: 3, height: '50' },
        });
        naverLogin.init();
        naverLogin.getLoginStatus(async (status) => {
          if (status) {
            const naverId = naverLogin.user.getId();
            await sendNaverIdToServer(naverId);
          }
        });
      }
    };

    if (!window.naver) {
      const script = document.createElement('script');
      script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
      script.type = 'text/javascript';
      script.onload = initNaverLogin;
      document.body.appendChild(script);
    } else {
      initNaverLogin();
    }
  }, []);

  const sendNaverIdToServer = async (naverId) => {
    try {
      const response = await axios.post('http://nam3324.synology.me:32845/member/naver-login', {
        naverId: naverId,
      });
      if (response.status === 200) {
        if (response.data.flag) {
          alert('네이버 로그인 성공');
          console.log('tokken 정보 : ', response.data.token);
          // Handle token saving or other logic here
        } else {
          alert('네이버 로그인 실패');
        }
      }
    } catch (error) {
      alert('네이버 로그인 실패');
      console.error(error);
    }
  };

  return <div id="naverIdLogin" />;
};

export default NaverLoginButton;
