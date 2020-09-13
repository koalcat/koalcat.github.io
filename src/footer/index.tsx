import React from 'react';
import styles from './index.module.less';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className={`${styles['typewriter-root']} ${styles.retroshadow}`}>
      <div className={`${styles.footer} ${styles.typewriter}`}>
        <span>{`Copyright © ${new Date().getFullYear()} `}<a href="mailto:xuchdeid@gmail.com">koalcat</a>.</span>
      </div>
    </div>
  );
};

export default Footer;
