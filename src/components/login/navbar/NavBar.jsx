import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './css/Navbar.module.css';
import btnImg from './img/btnImg.png';
import closeImg from './img/closeImg.png'


const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    setIsZoomed(!isZoomed);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setIsZoomed(false);
  };


  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarLinks}>
        <li className={styles.navbarLogo}>mylogo</li>
        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/mainpage" activeClassName="active">MainPage</NavLink></li>
        <li><NavLink to="/subpage" activeClassName="active">SubPage</NavLink></li>
        <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
      <button className={styles.MenuButton} onClick={handleMenuToggle}>
        <img src={btnImg} className={styles.btnImg} alt='Menu'/>
      </button>
      </ul>
      <div className={`${styles.menuPage} ${menuOpen ? styles.menuPageOpen : ''} ${isZoomed ? styles.zoomed : ''}`}>
        <button className={styles.CloseButton} onClick={handleMenuClose}>
          <img src={closeImg} className={styles.closeImg} alt='Close'/>
         </button> 
          <ul>
            <li><NavLink to="/mainpage">MainPage</NavLink></li><br/><br/>
            <li><NavLink to="/subpage">SubPage</NavLink></li><br/><br/>
            <li><NavLink to="/login">Login</NavLink></li>
         
          </ul>
        </div>
    </nav>
  );
};

export default NavBar;
