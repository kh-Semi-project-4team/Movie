import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import styles from './css/Navbar.module.css';
import SearchBox from '../searchbox/SearchBox';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [navBackground, setNavBackground] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();

  const openNav = () => {
    document.getElementById("myNav").classList.toggle(styles.menu_width);
    document.querySelector(`.${styles.custom_menu_btn}`).classList.toggle(styles.menu_btn_style);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setIsZoomed(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        setActiveSection(section.getAttribute('id'));
      }
    });

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
          <img src='/image/logo.png' className={styles.logo} alt='Logo' onClick={handleLogoClick}/>
        </li>
        <li className={styles.nav_gap_none}>
          <ScrollLink
            to="home-section"
            smooth={true}
            duration={500}
            className={({ isActive }) => (activeSection === 'home-section' ? styles.active : '')}
          >
            Home
          </ScrollLink>
        </li>
        <li className={styles.nav_gap_none}>
          <ScrollLink
            to="Best-section"
            smooth={true}
            duration={500}
            className={({ isActive }) => (activeSection === 'Best-section' ? styles.active : '')}
          >
            Best
          </ScrollLink>
        </li>
        <li className={styles.nav_gap_none}>
          <ScrollLink
            to="ComingSoon-section"
            smooth={true}
            duration={500}
            className={({ isActive }) => (activeSection === 'ComingSoon-section' ? styles.active : '')}
          >
            ComingSoon
          </ScrollLink>
        </li>
        <li className={styles.nav_gap_none}>
          <ScrollLink
            to="Kategorie-section"
            smooth={true}
            duration={500}
            className={({ isActive }) => (activeSection === 'Kategorie-section' ? styles.active : '')}
          >
            Kategorie
          </ScrollLink>
        </li>
        <li className={styles.nav_gap_none}>
          <div className={styles.custom_menu_btn}>
            <button onClick={openNav}>
              <span className={styles.s_1}> </span>
              <span className={styles.s_2}> </span>
              <span className={styles.s_3}> </span>
            </button>
            <div id="myNav" className={styles.overlay}>
              <div className={styles.overlay_content}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                <SearchBox/>
              </div>
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

export default NavBar;
