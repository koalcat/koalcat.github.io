import React from 'react';
import styles from './index.module.less';

interface FooterProps {}

const copyright = `© ${new Date().getFullYear()} ( 🐨 , 😺 ) => koalcat;`;

const Footer: React.FC<FooterProps> = () => {
    return (<div className={styles.footer}>
        <span>{copyright}</span>
    </div>)
}

export default Footer;