import React, { useEffect } from 'react';

const KakaoLogin = () => {
    useEffect(() => {
        // Kakao SDK 초기화
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init('85ff9e31128e06e7bbbd2b1bf75bc234'); // Replace with your Kakao REST API key
        }
    }, []);

    const handleKakaoLogin = () => {
        window.Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/oauth' // Replace with your redirect URI
        });
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleKakaoLogin}>
                <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" alt="카카오 로그인" />
            </button>
        </div>
    );
};

export default KakaoLogin;
