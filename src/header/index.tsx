import React from 'react';
import styles from './index.module.less';

interface HeaderProps {}

const logo = '(🐨, 😺) => \'koalcat\';';

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className={`${styles.header} ${styles.deepshadow}`}>
        <span>{logo}</span>
    </div>
  );
};

export default Header;
