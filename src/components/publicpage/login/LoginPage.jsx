import React, { useState } from 'react';
import NavBar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import LoginCard from './contents/LoginCard';
import Register from './contents/Register';
import Login from './contents/Login';
import KakaoLogin from './contents/KakaoLogin';
import NaverLogin from './contents/NaverLogin';
import styles from './css/LoginPage.module.css'; // 추가: CSS 파일을 import 합니다.

function LoginPage() {
  const [activeComponent, setActiveComponent] = useState('login');

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className={styles.container}> {/* 스타일 객체 대신 CSS 클래스를 사용합니다. */}
      <NavBar />
      <div style={{ flex: '1' }}>
        <div style={{ height: "100px" }} />
        {activeComponent === 'login' ? (
          <LoginCard onComponentChange={handleComponentChange} />
        ) : activeComponent === 'register' ? (
          <Register onComponentChange={handleComponentChange} />
        ) : activeComponent === 'kakaoLogin' ? (
          <KakaoLogin />
        ) : activeComponent === 'naverLogin' ? (
          <NaverLogin />
        ) : (
          <Login onComponentChange={handleComponentChange} />
        )}
      </div>
      <div style={{ height: "50px" }} />
      <Footer />
    </div>
  );
}

export default LoginPage;
