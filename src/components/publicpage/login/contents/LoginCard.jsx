import React, { useState } from 'react';
import styles from './css/logincard.module.scss';
import { CSSTransition } from 'react-transition-group';
import { gsap } from 'gsap';

const LoginCard = ({ onComponentChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    if (!menuOpen) {
      gsap.timeline()
        .to(`.${styles.logo}`, { scale: 0.8, opacity: 0, ease: 'power2.out', duration: 0.2 })
        .to(`.${styles.menuTriggerBar}.${styles.top}`, { x: 80, y: -80, delay: 0.05, ease: 'power4.in', duration: 0.2 })
        .to(`.${styles.menuTriggerBar}.${styles.middle}`, { x: 80, y: -80, ease: 'power4.in', duration: 0.2, onComplete: () => setMenuOpen(true) })
        .to(`.${styles.menuTriggerBar}.${styles.bottom}`, { x: 80, y: -80, delay: 0.1, ease: 'power4.in', duration: 0.2 })
        .to(`.${styles.menuBg}.${styles.top}`, { y: '13%', ease: 'power4.inOut', duration: 0.2 })
        .to(`.${styles.menuBg}.${styles.middle}`, { scaleY: 1, ease: 'power4.inOut', duration: 0.2 })
        .to(`.${styles.menuBg}.${styles.bottom}`, { y: '-114%', ease: 'power4.inOut', duration: 0.2 })
        .fromTo(`.${styles.menu}`, { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: 'power4.out', duration: 0.2 });
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.menuTrigger} onClick={handleToggleMenu}>
        <i className={`${styles.menuTriggerBar} ${styles.top}`} />
        <i className={`${styles.menuTriggerBar} ${styles.middle}`} />
        <i className={`${styles.menuTriggerBar} ${styles.bottom}`} />
      </span>
      <span className={styles.closeTrigger}>
        <i className={`${styles.closeTriggerBar} ${styles.left}`} />
        <i className={`${styles.closeTriggerBar} ${styles.right}`} />
      </span>
      <span className={styles.logo}>
        <span>
          <img src='./image/logo.png' className={styles.logo} alt="logo" />
        </span>
      </span>
      <div className={styles.innerContainer}>
        <i className={`${styles.menuBg} ${styles.top}`} />
        <i className={`${styles.menuBg} ${styles.middle}`} />
        <i className={`${styles.menuBg} ${styles.bottom}`} />
        <CSSTransition in={menuOpen} timeout={500} classNames={{
          enter: styles.menuEnter,
          enterActive: styles.menuEnterActive,
          exit: styles.menuExit,
          exitActive: styles.menuExitActive,
        }} unmountOnExit>
          <div className={styles.menuContainer}>
            <ul className={styles.menu}>
              <li><a href="#" onClick={() => onComponentChange('loginForm')}>Login</a></li>
              <li><a href="#" onClick={() => onComponentChange('register')}>Create account</a></li>
              <li><a href="#" onClick={() => onComponentChange('naverLogin')}>Naver</a></li>
              <li><a href="#" onClick={() => onComponentChange('kakaoLogin')}>Kakao</a></li>
            </ul>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default LoginCard;
