import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styles from './css/Login.module.css';
import { saveToken } from './store/MemberSlice';

const Login = ({ onComponentChange }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://nam3324.synology.me:32845/member/login', { id, pwd: password });
      if (response.status === 200) {
        if (response.data.flag) {
          alert('로그인 성공');
          dispatch(saveToken({
            token: response.data.token,
            username: response.data.username
          }));
          sessionStorage.setItem('username', response.data.username); // 세션에 사용자 정보 저장
          navigate('/');
        } else {
          alert('로그인 실패');
        }
      }
    } catch (error) {
      alert('로그인 실패');
      console.error(error);
    }
  };

  return (
    <div className={styles["login-box"]}>
      <h2>로그인 페이지</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["user-box"]}>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <label>아이디</label>
        </div>
        <div className={styles["user-box"]}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>암호</label>
        </div>
        <button type="submit" className={styles.btn}>로그인</button>
      </form>
      <button onClick={() => onComponentChange('login')} className={styles.btn}>뒤로가기</button>
    </div>
  );
};

export default Login;
