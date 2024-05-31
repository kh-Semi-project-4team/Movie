import React, { useEffect } from 'react';

const Login = () => {
    useEffect(() => {
        // Kakao SDK 초기화
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init('57b7f556c63c4dedc0c4ddc2d5d62a25');
        }
    }, []);

    const handleKakaoLogin = () => {
        window.Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/team4',
        });
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleKakaoLogin}>카카오 로그인</button>
        </div>
    );
};

export default Login;