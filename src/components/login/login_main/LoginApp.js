import React, { useState } from 'react';
import './../css/loginapp.css';  // 스타일은 별도의 CSS 파일로 관리합니다.

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`container ${menuOpen ? 'menu-open' : ''}`}>
      <span className="menu-trigger" onClick={toggleMenu}>
        <i className="menu-trigger-bar top"></i>
        <i className="menu-trigger-bar middle"></i>
        <i className="menu-trigger-bar bottom"></i>
      </span>
      <span className="close-trigger" onClick={toggleMenu}>
        <i className="close-trigger-bar left"></i>
        <i className="close-trigger-bar right"></i>
      </span>
      <span className="logo">
        <span>
          ⬢
          <i className="logo-title">UI</i>
          <i className="logo-badge">6</i>
        </span>
      </span>
      <div className="inner-container">
        <i className="menu-bg top"></i>
        <i className="menu-bg middle"></i>
        <i className="menu-bg bottom"></i>
        <div className="menu-container">
          <ul className="menu">
            <li><a href="#">Login</a></li>
            <li><a href="#">Create account</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>
      </div>
      <div id='links'>
        <a id='twitter' href="https://twitter.com/karlovidek" target="_blank" rel="noopener noreferrer">
          <span className='fa fa-twitter'></span>
        </a>
        <div id='pens'>
          <a href="https://codepen.io/karlovidek/" target="_blank" rel="noopener noreferrer">
            <span className='fa fa-codepen'></span>
          </a>
          my other Pens
        </div>
      </div>
    </div>
  );
};

export default App;