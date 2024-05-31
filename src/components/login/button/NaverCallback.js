import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Callback = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash.substring(1); // '#'을 제거한 해시 부분
        const params = new URLSearchParams(hash);

        const accessToken = params.get('access_token');
        const state = params.get('state');
        const tokenType = params.get('token_type');
        const expiresIn = params.get('expires_in');

        console.log('Access Token:', accessToken);
        console.log('State:', state);
        console.log('Token Type:', tokenType);
        console.log('Expires In:', expiresIn);

        if (accessToken) {
            // 네이버 로그인 상태 확인 및 처리
            const { naver } = window;
            naver.LoginWithNaverId.getLoginStatus((status) => {
                if (status) {
                    const email = naver.user.getEmail();
                    console.log('Naver user email:', email);
                    // 여기서 서버로 사용자 정보를 보내어 인증 처리
                    navigate('/');
                } else {
                    console.error('Naver login failed');
                }
            });
        } else {
            console.error('No access token found');
        }
    }, [navigate, location]);

    return <div>로그인 처리 중...</div>;
};

export default Callback;
