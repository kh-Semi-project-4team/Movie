import React, { useEffect } from 'react';

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

    return <div id="naverIdLogin" />;
};

export default NaverLoginButton;