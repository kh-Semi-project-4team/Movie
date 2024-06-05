import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import styles from './css/Navbar.module.css'; // Adjust module file path as per your project structure
import SearchBox from './../searchbox/SearchBox'; // Adjust path if needed
import profile from "./img/profile.png"; // Import profile image

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [navBackground, setNavBackground] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedUserLoggedInInformation === "1");

    // Mock user information for demonstration
    if (storedUserLoggedInInformation === "1") {
      setUserInfo({
        name: "John Doe", // Replace with actual user name
        profileImage: profile // Replace with actual profile image URL
      });
    } else {
      setUserInfo({});
    }
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUserInfo({});
  };

  const openNav = () => {
    document.getElementById("myNav").classList.toggle(styles.menu_width);
    document.querySelector(`.${styles.custom_menu_btn}`).classList.toggle(styles.menu_btn_style);
  };

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
                {isLoggedIn ? (
                  <>
                    <img src={userInfo.profileImage} alt="Profile" style={{ width: 50, height: 50 }} />
                    <p>{userInfo.name}</p>
                    <button onClick={handleLogout}>로그아웃</button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login">로그인</NavLink>
                    <SearchBox/>
                  </>
                )}
              </div>
            </div>
          </div>
        </li>
        <li className={styles.mobile}>
          {isLoggedIn ? (
            <>
              <img src={userInfo.profileImage} alt="Profile" style={{ width: 50, height: 50 }} />
              <p>네이버 클라우드</p>
            </>
          ) : (
            <p>로그인이 필요합니다</p>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
