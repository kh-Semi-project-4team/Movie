import React, { useEffect } from 'react';
import KakaoImage from './img/Kakao.png'; // Correct image import

const KakaoLogin = () => {
    useEffect(() => {
        // Load Kakao SDK script
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        script.async = true;
        script.onload = () => {
            // Initialize Kakao SDK
            if (window.Kakao && !window.Kakao.isInitialized()) {
                window.Kakao.init('85ff9e31128e06e7bbbd2b1bf75bc234'); // Replace with your Kakao REST API key
            }
        };
        document.body.appendChild(script);
    }, []);

    const handleKakaoLogin = () => {
        if (window.Kakao && window.Kakao.Auth) {
            window.Kakao.Auth.authorize({
                redirectUri: 'http://localhost:3000' // Replace with your redirect URI
            });
        } else {
            console.error('Kakao SDK not loaded');
        }
    };

    return (
        <div>
            <button onClick={handleKakaoLogin}>
                <img src={KakaoImage} alt="카카오 로그인" />
            </button>
        </div>
    );
};

export default KakaoLogin;
