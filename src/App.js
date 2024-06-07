import React from "react";
import { Provider } from 'react-redux';
import { store } from './components/publicpage/login/contents/store/store';
import { Routes, Route } from 'react-router-dom';
import SubPage from "./components/subpage/SubPage";
import MainPage from "./components/mainpage/MainPage";
import LoginPage from "./components/publicpage/login/LoginPage";
import NaverLoginCallback from './components/publicpage/login/contents/NaverLoginCallback'; // Naver callback
import KakaoLoginCallback from './components/publicpage/login/contents/KakaoLoginCallback'; // Kakao callback

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/subpage/:movieId" element={<SubPage />} />
        <Route path="/naver/callback" element={<NaverLoginCallback />} />
        <Route path="/kakao/callback" element={<KakaoLoginCallback />} />
        <Route path="/*" element={<LoginPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
