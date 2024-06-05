import React, { useEffect } from 'react';
import axios from 'axios';
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

  const handleKakaoLogin = async () => {
    if (window.Kakao && window.Kakao.Auth) {
      try {
        const authResult = await window.Kakao.Auth.authorize({
          redirectUri: 'http://localhost:3000', // Replace with your redirect URI
        });

        if (authResult) {
          const kakaoAccessToken = authResult.access_token;
          await sendKakaoIdToServer(kakaoAccessToken);
        }
      } catch (error) {
        console.error('Kakao login failed:', error);
      }
    } else {
      console.error('Kakao SDK not loaded');
    }
  };

  const sendKakaoIdToServer = async (kakaoAccessToken) => {
    try {
      const response = await axios.post('http://nam3324.synology.me:32845/member/kakao-login', {
        kakaoAccessToken: kakaoAccessToken,
      });

      if (response.status === 200) {
        if (response.data.flag) {
          alert('카카오 로그인 성공');
          console.log('tokken 정보 : ', response.data.token);
          // Handle token saving or other logic here
        } else {
          alert('카카오 로그인 실패');
        }
      }
    } catch (error) {
      alert('카카오 로그인 실패');
      console.error(error);
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
