import React from 'react';
import styles from './index.module.less';

interface HeaderProps {
  version: string;
  build: string;
}

const Header: React.FC<HeaderProps> = ({ version, build }: HeaderProps) => (
  <header className={styles.root}>
    <div className={styles.inner}>
      <a className={styles.brand} href="#top" aria-label="koalcat，回到顶部">
        <span className={styles.signature}>
          <span className={styles.args}>
            (<span role="img" aria-label="考拉">
              🐨
            </span>
            ,{' '}
            <span role="img" aria-label="猫">
              😺
            </span>
            )
          </span>
          <span className={styles.arrow}>=&gt;</span>
          <span className={styles.name}>koalcat;</span>
        </span>
      </a>
      <div className={styles.meta}>
        <span className={styles.product}>S1Fun</span>
        <span className={styles.version}>
          v{version} · build {build}
        </span>
        <a className={styles.link} href="#feedback">
          反馈
        </a>
      </div>
    </div>
  </header>
);

export default Header;
