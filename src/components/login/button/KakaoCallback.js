import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Callback = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');

        if (code) {
            window.Kakao.Auth.login({
                success: function(authObj) {
                    console.log('로그인 성공', authObj);
                    // 여기서 서버로 사용자 정보를 보내어 인증 처리
                    navigate('/');
                },
                fail: function(err) {
                    console.error('로그인 실패', err);
                },
            });
        } else {
            console.error('Authorization code not found');
        }
    }, [navigate, location]);

    return <div>로그인 처리 중...</div>;
};

export default Callback;