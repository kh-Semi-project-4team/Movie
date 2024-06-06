import React from "react";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import {persistor, store} from './components/login/login_main/store/store'; // Redux 스토어 불러오기
import { Routes, Route } from 'react-router-dom';
import SubPage from "./components/subpage/SubPage";
import MainPage from "./components/mainpage/MainPage";
import LoginMain from "./components/login/login_main/LoginMain";
import Register from "./components/login/login_main/Register";
import LoginApp from "./components/login/login_main/LoginApp";
import Main from "./components/login/login_main/Main";


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/subpage/:movieId" element={<SubPage />}  />
        <Route path="/login" element={<LoginMain />} />
        <Route path="/login/LoginApp" element={<LoginApp />} />
        <Route path="/login/Register" element={<Register />} /> 
        <Route path="/login/Main" element={<Main />} /> 
      </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;