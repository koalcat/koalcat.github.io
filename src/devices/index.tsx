import React from 'react';
import styles from './index.module.less';

interface PhoneProps {
  type: 'iphone' | 'android';
  screens: string[];
  active: number;
}

const Phone: React.FC<PhoneProps> = ({ type, screens, active }: PhoneProps) => {
  const frame = type === 'iphone' ? styles.iphone : styles.android;
  return (
    <div className={`${styles.frame} ${frame}`}>
      <div className={styles.screen}>
        {screens.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            className={index === active ? styles.shown : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default Phone;
