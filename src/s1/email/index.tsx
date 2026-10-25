import React from 'react';
import styles from './index.module.less';
import { contactMailto } from '../../contact';

const THREAD_URL = 'https://stage1st.com/2b/thread-1965537-1-1.html';

const Feedback: React.FC = () => (
  <div className={styles.root}>
    <p className={styles.label}>
      <span className={styles.index}>04</span>反馈
    </p>
    <div className={styles.body}>
      <p className={styles.text}>
        用着有问题，或者想要什么功能，去{' '}
        <a className={styles.link} href={THREAD_URL} rel="noopener noreferrer" target="_blank">
          stage1st 的帖子
        </a>{' '}
        里回一贴。
      </p>
      <p className={styles.aside}>
        也可以直接{' '}
        <a className={styles.link} href={contactMailto}>
          写封邮件
        </a>
        。
      </p>
    </div>
  </div>
);

export default Feedback;
