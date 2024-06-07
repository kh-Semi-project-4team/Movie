import React, { useEffect } from 'react';

const NaverLogin = () => {
  useEffect(() => {
    const { naver } = window;
    if (!naver) return;

    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'DV7Jw_pPlhIl8zfw4nRn',
      callbackUrl: 'http://teeput.synology.me:40215/',
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 40 },
    });
    naverLogin.init();
    naverLogin.getLoginStatus((status) => {
      if (status) {
        const { email, name } = naverLogin.user;
        sessionStorage.setItem('username', name);
        sessionStorage.setItem('email', email);
        window.location.href = '/';
      } else {
        document.getElementById('naverIdLogin').firstChild.click();
      }
    });
  }, []);

  return <div id="naverIdLogin" style={{ display: 'none' }} />;
};

export default NaverLogin;
