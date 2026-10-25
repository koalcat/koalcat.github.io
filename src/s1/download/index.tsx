import React from 'react';
import styles from './index.module.less';
import AppInfo from '../android.json';

interface DownloadProps {
  size: string;
}

const AndroidGlyph = () => (
  <svg className={styles.glyph} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.46 11.46 0 0 0-8.94 0L5.65 5.67c-.19-.29-.54-.38-.84-.22-.3.16-.42.54-.26.85L6.4 9.48A10.8 10.8 0 0 0 .8 18.34h22.4a10.8 10.8 0 0 0-5.6-8.86M7 15.25a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2m10 0a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2" />
  </svg>
);

const AppleGlyph = () => (
  <svg className={styles.glyph} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25" />
  </svg>
);

const Download: React.FC<DownloadProps> = ({ size }: DownloadProps) => (
  <div className={styles.root}>
    <a
      className={`${styles.button} ${styles.primary}`}
      href={AppInfo.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <AndroidGlyph />
      <span className={styles.labels}>
        <span className={styles.label}>下载 Android 版</span>
        <span className={styles.sub}>APK · {size}</span>
      </span>
    </a>
    <a
      className={`${styles.button} ${styles.secondary}`}
      href="https://apps.apple.com/cn/app/s1fun/id1531897069"
      rel="noopener noreferrer"
      target="_blank"
    >
      <AppleGlyph />
      <span className={styles.labels}>
        <span className={styles.label}>App Store</span>
        <span className={styles.sub}>iOS</span>
      </span>
    </a>
  </div>
);

export default Download;
