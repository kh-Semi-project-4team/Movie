import React from 'react';
import { Link } from 'react-router-dom';
import NaverLoginButton from './../button/NaverLoginButton';
import KakaoLoginButton from './../button/KakaoLoginButton';
import styles from './css/Home.module.css';


const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeLinks}>
                <Link to="/login/LoginApp" className={styles.homeLink}>Login</Link>
                <Link to="/login/Register" className={styles.homeLink}>Register</Link>
                <Link to="/" className={styles.homeLink}>MainPage</Link>
            </div>
            <div className={styles.socialLogin}>
                <NaverLoginButton />
                <KakaoLoginButton />
        
            </div>
        </div>
    );
};

export default Home;
