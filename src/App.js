import React from "react";
import { Provider } from 'react-redux';
import { store } from './components/login/login_main/store/store';
import { Routes, Route } from 'react-router-dom';
import SubPage from "./components/subpage/SubPage";
import MainPage from "./components/mainpage/MainPage";
import LoginPage from "./components/login/LoginPage";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/subpage/:movieId" element={<SubPage />} />
        <Route path="/*" element={<LoginPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
