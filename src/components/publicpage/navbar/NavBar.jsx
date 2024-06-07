import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import styles from './css/Navbar.module.css';
import SearchBox from '../searchbox/SearchBox';

const NavBar = ({ title, sections = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [navBackground, setNavBackground] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

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

    const headerSection = document.getElementById('header-section') || document.getElementById('home-section');
    if (headerSection) {
      const headerOffset = headerSection.offsetTop;
      const headerHeight = headerSection.offsetHeight;
      if (window.scrollY >= headerOffset + headerHeight) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    setUsername('');
    navigate('/login');
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
        {sections.map(section => (
          <li key={section.id} className={styles.nav_gap_none}>
            <ScrollLink
              to={section.id}
              smooth={true}
              duration={500}
              className={activeSection === section.id ? styles.active : ''}
            >
              {section.name}
            </ScrollLink>
          </li>
        ))}
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
                {username ? (
                  <NavLink onClick={handleLogout} className={styles.logout} to="/login">Logout</NavLink>
                ) : (
                  <NavLink to="/login">Login</NavLink>
                )}
                <SearchBox />
              </div>
            </div>
          </div>
        </li>
        <li className={styles.mobile}>
          {username ? `${username}님` : '로그인'}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;