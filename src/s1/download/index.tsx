import React from 'react';
import styles from './index.module.less';
import AppInfo from '../android.json';

interface DownloadProps {}

const Download: React.FC = (props: DownloadProps) => {
  return (
    <div className={styles.root}>
      <a className={styles.android} href={AppInfo.url} rel="noopener noreferrer" target="_blank" />
      <a className={styles.ios} href="https://apps.apple.com/cn/app/s1fun/id1531897069" rel="noopener noreferrer" target="_blank"/>
    </div>
  );
};

export default Download;
