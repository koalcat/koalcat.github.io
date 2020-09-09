import React from 'react';
import styles from './index.module.less';

interface FooterProps {}

const copyright = `©${new Date().getFullYear()} koalcat`;

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className={`${styles['typewriter-root']} ${styles.retroshadow}`}>
      <div className={`${styles.footer} ${styles.typewriter}`}>
        <span>{copyright}</span>
      </div>
    </div>
  );
};

export default Footer;
