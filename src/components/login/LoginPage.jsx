// components/login/login_main/LoginPage.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginMain from './login_main/LoginMain';
import Register from './login_main/Register';
import LoginApp from './login_main/LoginApp';
import Logout from './login_main/Logout';

function LoginPage() {
  return (
    <Routes>
      <Route path="/login" element={<LoginMain />} />
      <Route path="/login/LoginApp" element={<LoginApp />} />
      <Route path="/login/Register" element={<Register />} />
      <Route path="/login/Logout" element={<Logout />} />
    </Routes>
  );
}

export default LoginPage;
