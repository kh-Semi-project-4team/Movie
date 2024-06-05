import React from "react";
import { Provider } from 'react-redux';
import {store} from './components/login/login_main/store/store';
import { Routes, Route } from 'react-router-dom';
import SubPage from "./components/subpage/SubPage";
import MainPage from "./components/mainpage/MainPage";
import LoginMain from "./components/login/login_main/LoginMain";
import Register from "./components/login/login_main/Register";
import LoginApp from "./components/login/login_main/LoginApp";
import Logout from "./components/login/login_main/Logout";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/subpage/:movieId" element={<SubPage />} />
        <Route path="/login" element={<LoginMain />} />
        <Route path="/login/LoginApp" element={<LoginApp />} />
        <Route path="/login/Register" element={<Register />} /> 
        <Route path="/login/Logout" element={<Logout />} /> 
      </Routes>
    </Provider>
  );
}

export default App;