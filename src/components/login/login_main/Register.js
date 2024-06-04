import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/register.css'; // CSS 파일 임포트

const Register = () => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [userNick, setUserNick] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://nam3324.synology.me:32845/member/register', {
        userID:id,
        userName: userName,
        userPassword: password,
        userEmail:email,
        userPhone: phone,
        userNickName: userNick,
        userGender: gender
      });
      alert('회원가입 성공');
      navigate('/login');
    } catch (error) {
      alert('회원 가입 실패');
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="register-input"
        />
        <br/>
        <input
          type="password"
          placeholder="암호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="register-input"
        />
        <br />
        <input
          type="text"
          placeholder="이름"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="register-input"
        />
        <br />
        <input
          type="text"
          placeholder="닉네임"
          value={userNick}
          onChange={(e) => setUserNick(e.target.value)}
          required
          className="register-input"
        />
        <br />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="register-input"
        />
        <br />    
        <input
          type="text"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="register-input"
        />
        <br />    
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="register-input"
        >
          <option value="" disabled>
            성별 선택
          </option>
          <option value="M">남자</option>
          <option value="F">여자</option>
        </select>
        <br />
        <button type="submit" className="register-button">
          사용자 등록하기
        </button>
      </form>
    </div>
  );
};

export default Register;

