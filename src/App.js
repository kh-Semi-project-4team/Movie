import React from "react";
import { Routes, Route } from 'react-router-dom';
import SubPage from "./components/subpage/SubPage";
import MainPage from "./components/mainpage/MainPage";
import Login from "./components/login/login_main/Login";
import KategorieMovie from "./components/mainpage/contents/KategorieMovie";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/subpage/:movieId" element={<SubPage />} />
      <Route path="/login" element={<Login />} />
  </Routes>
  );
}

export default App;