import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { Kakao } = window;
    if (!Kakao.isInitialized()) {
      console.log('Kakao is not initialized. Initializing now...');
      Kakao.init('57b7f556c63c4dedc0c4ddc2d5d62a25');
    } else {
      console.log('Kakao is already initialized.');
    }

    console.log('Kakao:', Kakao);

    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/kakao/callback',
    });
  }, [navigate]);

  return null; // 렌더링하지 않음
};

export default KakaoLogin;
