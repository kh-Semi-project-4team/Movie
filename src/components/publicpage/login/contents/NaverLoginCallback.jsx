import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverLoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { naver } = window;
    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'DV7Jw_pPlhIl8zfw4nRn',
      callbackUrl: 'http://localhost:3000/naver/callback',
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 40 },
    });
    naverLogin.init();
    naverLogin.getLoginStatus((status) => {
      if (status) {
        const { email, name } = naverLogin.user;
        sessionStorage.setItem('username', name);
        sessionStorage.setItem('email', email);
        navigate('/');
      } else {
        alert('네이버 로그인 실패');
        navigate('/login');
      }
    });
  }, [navigate]);

  return <div>로그인 중...</div>;
};

export default NaverLoginCallback;
