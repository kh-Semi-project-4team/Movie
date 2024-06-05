import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import styles from './css/LoginApp.module.css'; // Import CSS module styles
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
        navigate('/');
      }
    } catch (error) {
      alert('로그인 실패');
      console.error(error);
    }
  };

  return (
    <div className={styles["login-box"]}> {/* Apply CSS module class */}
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
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginApp;
