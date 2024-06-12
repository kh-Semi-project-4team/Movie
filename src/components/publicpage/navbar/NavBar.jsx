import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import styles from './css/Navbar.module.css';
import SearchBox from '../searchbox/SearchBox';

const NavBar = ({ title, sections = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴가 열려 있는지 여부를 관리하는 상태
  const [isZoomed, setIsZoomed] = useState(false); // 확대 여부를 관리하는 상태
  const [navBackground, setNavBackground] = useState(false); // 네비게이션 배경 여부를 관리하는 상태
  const [activeSection, setActiveSection] = useState(''); // 현재 활성화된 섹션을 관리하는 상태
  const [username, setUsername] = useState(''); // 사용자 이름을 관리하는 상태
  const navigate = useNavigate(); // 라우팅을 위한 훅

  useEffect(() => {
    // 페이지 로드 시 sessionStorage에서 사용자 이름을 가져옴
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const openNav = () => {
    // 메뉴를 여는 함수, 메뉴의 너비와 버튼 스타일을 토글
    document.getElementById("myNav").classList.toggle(styles.menu_width);
    document.querySelector(`.${styles.custom_menu_btn}`).classList.toggle(styles.menu_btn_style);
  };

  const handleMenuClose = () => {
    // 메뉴를 닫는 함수
    setMenuOpen(false);
    setIsZoomed(false);
  };

  const handleLogoClick = () => {
    // 로고 클릭 시 홈으로 이동
    navigate('/');
  };

  const handleScroll = () => {
    // 스크롤 이벤트 핸들러
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 200;

    // 현재 스크롤 위치에 따라 활성화된 섹션을 설정
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        setActiveSection(section.getAttribute('id'));
      }
    });

    // 헤더 섹션의 위치에 따라 네비게이션 배경 설정
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
    // 로그아웃 함수, sessionStorage에서 사용자 이름을 제거하고 로그인 페이지로 이동
    sessionStorage.removeItem('username');
    setUsername('');
    navigate('/login');
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${navBackground ? styles.navbarScrolled : ''}`}>
      <ul className={styles.navbarLinks}>
        <li onClick={handleLogoClick}>
          <img src='/image/logo.png' className={styles.logo} alt='Logo' onClick={handleLogoClick} />
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
          {username ? `${username}님` : <Link to="/login">로그인</Link>}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
