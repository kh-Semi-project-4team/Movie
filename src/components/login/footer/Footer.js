import React from 'react';
import styles from './css/Footer.module.css';
import { facebook, instagram, github, google } from './img';

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
        { type: 'section', title: 'logo' },
        { type: 'section', title: 'Quick Link', items: ['Home', 'Login'] },
        {
            type: 'section', title: 'Follow Us', items: [
                <img key="facebook" src={facebook} alt='Facebook' className={styles.footerIcon} />,
                <img key="instagram" src={instagram} alt='Instagram' className={styles.footerIcon} />
            ]
        },
        {
            type: 'section', title: 'Information', items: [
                <img key="github" src={github} alt='Github' className={styles.footerIcon} />,
                <img key="google" src={google} alt='Google' className={styles.footerIcon} />
            ]
        }
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.footerIcons}>
                {items.filter(item => item.type === 'icon').map((item, index) => (
                    <img key={index} src={item.icon} alt={item.type} className={styles.footerIcon} />
                ))}
            </div>
            <div className={styles.footerSections}>
                {items.filter(item => item.type === 'section').map((item, index) => (
                    <FooterSection key={index} title={item.title} items={item.items} />
                ))}
            </div>
        </footer>
    );
};

export default Footer;
