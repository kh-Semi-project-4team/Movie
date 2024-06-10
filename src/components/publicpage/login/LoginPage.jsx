import React, { useState } from 'react';
import NavBar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import LoginCard from './contents/LoginCard';
import Register from './contents/Register';
import Login from './contents/Login';
import KakaoLogin from './contents/KakaoLogin';
import NaverLogin from './contents/NaverLogin';

function LoginPage() {
  const [activeComponent, setActiveComponent] = useState('login');

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '900px' }}>
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
      <Footer />
    </div>
  );
}

export default LoginPage;
