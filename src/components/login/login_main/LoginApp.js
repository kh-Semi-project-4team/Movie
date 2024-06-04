import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './css/Login.module.css'; // CSS 파일 임포트
import { saveToken } from './store/MemberSlice';

const LoginApp = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://nam3324.synology.me:32845/member/login', { id : id, pwd : password });
      if (response.status === 200) {
        if(response.data.flag)
          alert('로그인 성공');
        else
          alert('로그인 실패');
        console.log('tokken 정보 : ',response.data.token);
        dispatch(saveToken(response.data));
        navigate('/main');
      }
    } catch (error) {
      alert('로그인 실패');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">로그인 페이지</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="login-input"
        />
        <br />
        <input
          type="password"
          placeholder="암호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <br />
        <button type="submit" className="login-button">로그인</button>
      </form>
    </div>
  );
};

export default LoginApp;
