import React from 'react';
import styles from './index.module.less';

interface PhoneProps {
  type: 'iphone' | 'android';
  screen?: string;
  style?: React.CSSProperties;
  className?: string;
}

const Phone: React.FC<PhoneProps> = (props: PhoneProps) => {
  switch (props.type) {
    case 'iphone':
      return (
        <div className={`${styles['marvel-device']} ${styles['iphone-x']} ${props.className? props.className : ''}`} style={props.style}>
          <div className={styles.notch}>
            <div className={styles.camera}></div>
            <div className={styles.speaker}></div>
          </div>
          <div className={styles['top-bar']}></div>
          <div className={styles.sleep}></div>
          <div className={styles['bottom-bar']}></div>
          <div className={styles.volume}></div>
          <div className={styles.overflow}>
            <div className={`${styles.shadow} ${styles['shadow--tr']}`}></div>
            <div className={`${styles.shadow} ${styles['shadow--tl']}`}></div>
            <div className={`${styles.shadow} ${styles['shadow--br']}`}></div>
            <div className={`${styles.shadow} ${styles['shadow--bl']}`}></div>
          </div>
          <div className={styles['inner-shadow']}></div>
          <div className={styles.screen}>
            <img src={props.screen} alt="phone" style={{ width: '100%' }} />
          </div>
        </div>
      );
    default:
      return (
        <div className={`${styles['marvel-device']} ${styles.note8} ${props.className? props.className : ''}`} style={props.style}>
          <div className={styles.inner}></div>
          <div className={styles.overflow}>
            <div className={styles.shadow}></div>
          </div>
          <div className={styles.speaker}></div>
          <div className={styles.sensors}></div>
          <div className={styles['more-sensors']}></div>
          <div className={styles.sleep}></div>
          <div className={styles.volume}></div>
          <div className={styles.camera}></div>
          <div className={styles.screen}>
            <img src={props.screen} alt="phone" style={{ width: '100%' }} />
          </div>
        </div>
      );
  }
};

export default Phone;
