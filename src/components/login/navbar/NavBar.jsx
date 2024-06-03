import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './css/Navbar.module.css';
import btnImg from './img/btnImg.png';
import closeImg from './img/closeImg.png';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [navBackground, setNavBackground] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    setIsZoomed(!isZoomed);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setIsZoomed(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleScroll = () => {
    const bestMovieSection = document.getElementById('best-movie');
    if (bestMovieSection) {
      const bestMovieOffset = bestMovieSection.offsetTop;
      if (window.scrollY >= bestMovieOffset) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${navBackground ? styles.navbarScrolled : ''}`}>
      <ul className={styles.navbarLinks}>
        <li className={styles.navbarLogo} onClick={handleLogoClick}>
          <img src='/image/logo.png' className={styles.logo} alt='Logo'/>
        </li>
        <li><NavLink exact to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
        <li><NavLink to="/mainpage" className={({ isActive }) => (isActive ? 'active' : '')}>MainPage</NavLink></li>
        <li><NavLink to="/subpage" className={({ isActive }) => (isActive ? 'active' : '')}>SubPage</NavLink></li>
        <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink></li>
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
