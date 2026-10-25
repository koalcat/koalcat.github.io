import React from 'react';
import styles from './index.module.less';
import { contactMailto } from '../contact';

const Footer: React.FC = () => (
  <footer className={styles.root}>
    <div className={styles.inner}>
      <span className={styles.copy}>
        © {new Date().getFullYear()}{' '}
        <a className={styles.mail} href={contactMailto}>
          koalcat
        </a>
      </span>
      <span className={styles.note}>非官方客户端 · 与 stage1st 官方无关</span>
      <a className={styles.top} href="#top">
        回到顶部 ↑
      </a>
    </div>
  </footer>
);

export default Footer;
