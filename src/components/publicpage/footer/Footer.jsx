import React from 'react';
import styles from './css/Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

const FooterSection = ({ title, items }) => (
    <div className={styles.footerSection}>
        <h3>{title}</h3>
        <div className={styles.footerSectionItems}>
            {items && items.map((item, index) => (
                <div key={index} className={styles.footerSectionItem}>
                    {item}
                </div>
            ))}
        </div>
    </div>
);

const Footer = () => {
    const items = [
        { type: 'section', items: [<img key="logo" src="/image/logo.png" alt="Logo" className={styles.footerLogo} />] },
        { type: 'section', title: 'Quick Link', items: ['Home', 'Login'] },
        {
            type: 'section', title: 'Follow Us', items: [
                <a key="facebook" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} className={styles.footerIcon} />
                </a>,
                <a key="instagram" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} className={styles.footerIcon} />
                </a>
            ]
        },
        {
            type: 'section', title: 'Information', items: [
                <a key="github" href="https://github.com/kh-Semi-project-4team/Movie" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} className={styles.footerIcon} />
                </a>,
                <a key="google" href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGoogle} className={styles.footerIcon} />
                </a>
            ]
        }
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.footerSections}>
                {items.filter(item => item.type === 'section').map((item, index) => (
                    <FooterSection key={index} title={item.title} items={item.items} />
                ))}
            </div>
        </footer>
    );
};

export default Footer;
