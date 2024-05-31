import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './../css/Animation.scss'; // 애니메이션 관련 CSS 파일
import NaverLoginButton from './NaverLoginButton';
import { Link } from 'react-router-dom';
import Logo_1 from '../img/Logo_1.png';

const Animation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginSuccess = (email) =>{
    console.log('Logged in with Naver:',email);
    setIsOpen(false);
  }

  return (
    <div className="container">
      <span className="menu-trigger" onClick={handleToggleMenu}>
        <motion.i className="menu-trigger-bar top"></motion.i>
        <motion.i className="menu-trigger-bar middle"></motion.i>
        <motion.i className="menu-trigger-bar bottom"></motion.i>
      </span>
      <span className="close-trigger" onClick={handleToggleMenu}>
        <motion.i className="close-trigger-bar left"></motion.i>
        <motion.i className="close-trigger-bar right"></motion.i>
      </span>
     
      <motion.span 
      className="logo"
      initial={{opacity:1}}
      animate={{opacity:isOpen?0:1}}
      transition={{duration: 0.3}}
      >
        <span>
        <img src='../img/Logo_1.png' alt="Team Logo" className="logo-image" />
        </span>

      </motion.span>
      <div className="inner-container">
        <motion.i
          className={`menu-bg top ${isOpen ? 'open' : ''}`}
          initial={false}
          animate={{ transform: isOpen ? 'rotate(-45deg) scale(1)' : 'rotate(-45deg) scale(0)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        ></motion.i>
        <motion.i
          className={`menu-bg middle ${isOpen ? 'open' : ''}`}
          initial={false}
          animate={{ transform: isOpen ? 'rotate(-45deg) scale(1)' : 'rotate(-45deg) scale(0)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        ></motion.i>
        <motion.i
          className={`menu-bg bottom ${isOpen ? 'open' : ''}`}
          initial={false}
          animate={{ transform: isOpen ? 'rotate(-45deg) scale(1)' : 'rotate(-45deg) scale(0)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        ></motion.i>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="menu-container"
              initial={{ opacity: 0, height:0}}
              animate={{ opacity: 1, height: 'auto'}}
              exit={{ opacity: 0, height: 0}}
              transition={{ duration: 0.5 }}
            >
              <ul className="menu">
                <li>
                  <NaverLoginButton onSuccess={handleLoginSuccess}/> 
                </li>
                <li>
                  <Link to="#">KakaoLoginButton</Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default Animation;
