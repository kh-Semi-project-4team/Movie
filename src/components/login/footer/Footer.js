import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import './../css';
import {facebook, instagram,gitihub,google} from './../icons';

const Footer = () => {
    const items = [
        {type:'icon', icon : facebook},
        {type:'icon', icon : instagram},
        {type:'icon', icon : gitihub},
        {type:'icon', icon : google},

        {type : 'section', title: 'logo'},
        {type : 'section', title: 'Quick Link', items:[Home,Login]},
        {type : 'section', title: 'Follow Us',
         items: [<img src='./../icons/facebook.png' alt='img1'/>,
         <img src='./../icons/instagram.png' alt='img2'/>]},
        {type : 'section', title: 'Information',
         items: [<img src='./../icons/gitihub.png' alt='img3'/>,
         <img src='./../icons/google.png' alt='img4'/>]}
    ]
    return (
        <footer className="footer">
            <div className="footer-icons">
                {items.filter(item => item.type === 'icon').map((item, index) => {
                    const IconComponent = item.icon;
                    return <IconComponent key={index} className="footer-icon" />;
                })}
            </div>
            {items.filter(item => item.type === 'section').map((item, index) => (
                <FooterSection key={index} title={item.title} items={item.items} />
            ))}
        </footer>
    );
};


export default Footer;