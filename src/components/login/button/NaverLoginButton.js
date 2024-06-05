import React, { useEffect } from 'react';
import './css/NaverLoginButton.css'; // Ensure you have the correct CSS file
import naverButtonImage from './img/Naver.png'; // Import the image

const NaverLoginButton = () => {
    const handleNaverLogin = () => {
        const { naver } = window;
        if (naver) {
            const naverLogin = new naver.LoginWithNaverId({
                clientId: 'TooiyU0HesehTpxDkmE8',
                callbackUrl: 'http://localhost:3000/#/team4',
                isPopup: false,
            });
            naverLogin.init();
        }
    };

    useEffect(() => {
        if (!window.naver) {
            const script = document.createElement('script');
            script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
            script.type = 'text/javascript';
            script.onload = handleNaverLogin;
            document.body.appendChild(script);
        } else {
            handleNaverLogin();
        }
    }, []);

    return (
        <div 
            id="naverIdLogin" 
            className="naver-login-container" // Add a class for styling
        >
            <img src={naverButtonImage} alt="Naver Login" onClick={handleNaverLogin} />
        </div>
    );
};

export default NaverLoginButton;
