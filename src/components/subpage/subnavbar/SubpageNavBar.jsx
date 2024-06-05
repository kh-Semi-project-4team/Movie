import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './css/SubpageNavBar.module.css';

const SubNavBar = () => {
  const [navBackground, setNavBackground] = useState(false);
  const navigate = useNavigate();

  const openNav = () => {
    document.getElementById("myNav").classList.toggle(styles.menu_width);
    document.querySelector(`.${styles.custom_menu_btn}`).classList.toggle(styles.menu_btn_style);
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
        <li onClick={handleLogoClick}> 
          <img src='/image/logo.png' className={styles.logo} alt='Logo' />
        </li>
        <li className={styles.custom_menu_btn}>
          <button onClick={openNav}>
            <span className={styles.s_1}></span>
            <span className={styles.s_2}></span>
            <span className={styles.s_3}></span>
          </button>
          <div id="myNav" className={styles.overlay}>
            <div className={styles.overlay_content}>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/login">Login</NavLink>
            </div>
          </div>
        </li>
        <li className={styles.mobile}>
          ---님{/* session에 로그인정보가 있으면 표시 없으면 로그인 창으로 이동*/}
        </li>
      </ul>
    </nav>
  );
};

export default SubNavBar;
