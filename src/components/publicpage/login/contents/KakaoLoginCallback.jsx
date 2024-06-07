import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const KakaoLoginCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { Kakao } = window;
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (!Kakao.isInitialized()) {
      console.log('Kakao is not initialized. Initializing now...');
      Kakao.init('57b7f556c63c4dedc0c4ddc2d5d62a25');
    }

    console.log('Kakao:', Kakao);

    if (code) {
      axios.post('https://kauth.kakao.com/oauth/token', new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: '57b7f556c63c4dedc0c4ddc2d5d62a25',
        redirect_uri: 'http://teeput.synology.me:40215/kakao/callback',
        code: code,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(response => {
        const { access_token } = response.data;
        console.log('Access Token:', access_token);

        if (Kakao && Kakao.Auth) {
          Kakao.Auth.setAccessToken(access_token);
          Kakao.API.request({
            url: '/v2/user/me',
            success: (res) => {
              console.log('Kakao API Request Success:', res);
              const { email, nickname } = res.kakao_account.profile;
              sessionStorage.setItem('username', nickname);
              sessionStorage.setItem('email', email);
              navigate('/');
            },
            fail: (error) => {
              console.error('Kakao API Request Fail:', error);
              navigate('/login');
            },
          });
        } else {
          console.error('Kakao Auth not initialized');
          navigate('/login');
        }
      }).catch(error => {
        console.error('Kakao Auth Token Request Fail:', error);
        navigate('/login');
      });
    } else {
      console.error('Authorization code not found');
      navigate('/login');
    }
  }, [navigate, location]);

  return <div>로그인 중...</div>;
};

export default KakaoLoginCallback;
