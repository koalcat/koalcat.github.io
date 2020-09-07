import React, { useEffect, useRef, useState } from 'react';
import info from './discription.json';
import styles from './index.module.less';
import '../App.css';
import { clearInterval } from 'timers';
import { CSSTransition } from 'react-transition-group';
import Footer from '../footer';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const icon = require('./Icon-App-76x76@2x.png');
const snapshots = {
  dark: {
    0: require('./snapshot2.png'),
    1: require('./snapshot1.png'),
  },
  light: {
    0: require('./snapshot4.png'),
    1: require('./snapshot3.png'),
  },
};

interface AppProps {}

const App: React.FC<AppProps> = (props: AppProps) => {
  const [dark, setDark] = useState(false);
  const timeRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timeRef.current = setInterval(() => {
      setDark((dark) => {
        return !dark;
      });
    }, 5000);
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    };
  }, []);
  return (
    <>
      <header className="App-header">
        <div className={styles.s1}>
          <img src={icon} alt="logo" className={styles.logo} />
          <h3 className={styles.h3}>{info.name}</h3>
          <div dangerouslySetInnerHTML={{ __html: info.description }} />
        </div>
      </header>
      {dark && (
        <CSSTransition
          in={dark}
          timeout={1000}
          classNames={{
            enter: styles['node-enter'],
            enterActive: styles['node-enter-active'],
            exit: styles['node-exit'],
            exitActive: styles['node-exit-active'],
          }}
        >
          <div className={styles.snapshots}>
            <img
              src={snapshots.dark[0]}
              alt="snapshot"
              className={`${styles.snapshot} ${styles.snapshot1}`}
            />
            <img
              src={snapshots.dark[1]}
              alt="snapshot"
              className={`${styles.snapshot} ${styles.snapshot2}`}
            />
          </div>
        </CSSTransition>
      )}
      {!dark && (
        <CSSTransition
          in={!dark}
          timeout={1000}
          classNames={{
            enter: styles['node-enter'],
            enterActive: styles['node-enter-active'],
            exit: styles['node-exit'],
            exitActive: styles['node-exit-active'],
          }}
        >
          <div className={styles.snapshots}>
            <img
              src={snapshots.light[0]}
              alt="snapshot"
              className={`${styles.snapshot} ${styles.snapshot1}`}
            />
            <img
              src={snapshots.light[1]}
              alt="snapshot"
              className={`${styles.snapshot} ${styles.snapshot2}`}
            />
          </div>
        </CSSTransition>
      )}
      <Footer />
    </>
  );
};

export default App;
