import React, { useState } from 'react';
import styles from './css/Animation.module.css'; // Import as a CSS module
import Logo_1 from './img/Logo_1.png';
import Home from './Home';
import Footer from '../footer/Footer';

const LoginMain = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <span className={styles['menu-trigger']} onClick={handleToggleMenu}>
        <i className={styles['menu-trigger-bar']} />
        <i className={styles['menu-trigger-bar']} />
        <i className={styles['menu-trigger-bar']} />
      </span>
      <span className={styles['close-trigger']} onClick={handleToggleMenu}>
        <i className={styles['close-trigger-bar']} />
        <i className={styles['close-trigger-bar']} />
      </span>

      <span
        className={styles.logo}
        style={{ opacity: isOpen ? 0 : 1, transition: 'opacity 0.3s' }}
      >
        <img src={Logo_1} alt="Team Logo" className={styles['logo-image']} />
      </span>
      <div className={styles['inner-container']}>
        <i
          className={`${styles['menu-bg']} ${styles.top} ${isOpen ? styles.open : ''}`}
          style={{
            transform: isOpen ? 'rotate(-45deg) scale(1)' : 'rotate(-45deg) scale(0)',
            transition: 'transform 0.5s ease-in-out'
          }}
          onClick={handleToggleMenu}
        />
        <i
          className={`${styles['menu-bg']} ${styles.middle} ${isOpen ? styles.open : ''}`}
          style={{
            transform: isOpen ? 'rotate(-45deg) scale(1)' : 'rotate(-45deg) scale(0)',
            transition: 'transform 0.5s ease-in-out'
          }}
          onClick={handleToggleMenu}
        />
        <i
          className={`${styles['menu-bg']} ${styles.bottom} ${isOpen ? styles.open : ''}`}
          style={{
            transform: isOpen ? 'rotate(-45deg) scale(1)' : 'rotate(-45deg) scale(0)',
            transition: 'transform 0.5s ease-in-out'
          }}
          onClick={handleToggleMenu}
        />
        {isOpen && (
           <div
           className={`${styles['menu-container']} ${isOpen ? styles.open : ''}`}
           style={{
             transition: 'opacity 0.5s ease-in-out, top 0.5s ease-in-out'
           }}
          >
            <ul className={styles.menu}>
              <li>
                <Home containerSize={{ width: 320, height: 568 }} containerOpen={isOpen}/>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginMain;
