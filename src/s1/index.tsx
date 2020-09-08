import React, { useEffect, useRef, useState } from 'react';
import info from './discription.json';
import styles from './index.module.less';
import '../App.css';
import { clearInterval } from 'timers';
import { CSSTransition } from 'react-transition-group';
import Phone from '../devices';
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
  dark: [require('./snapshot2.png'), require('./snapshot1.png')],
  light: [require('./snapshot4.png'), require('./snapshot3.png')]
};
const androidSnapshots = {
  dark: [require('./snapshot2a.png'), require('./snapshot1a.png')],
  light: [require('./snapshot4a.png'), require('./snapshot3a.png')]
};

interface AppProps {}

const App: React.FC<AppProps> = (props: AppProps) => {
  const [dark, setDark] = useState(true);
  const [sceenshot, setScreenshot] = useState(1);
  const timeRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timeRef.current = setInterval(() => {
      setScreenshot((current) => {
        current++;
        if (current >= 2) {
          current = 0;
          setDark((_dark) => !_dark);
        }
        return current;
      })
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
          <div className={styles.box}>
            <div dangerouslySetInnerHTML={{ __html: info.description }} />
          </div>
        </div>
      </header>
      <CSSTransition
          in={true}
          timeout={1000}
          classNames={{
            enter: styles['node-enter'],
            enterActive: styles['node-enter-active'],
            exit: styles['node-exit'],
            exitActive: styles['node-exit-active'],
          }}
        >
        <div className={styles.snapshots}>
          <Phone type='iphone' screen={dark ? snapshots.dark[sceenshot] : snapshots.light[sceenshot] } style={{margin: '10px'}}/>
          <Phone type='android' screen={dark ? androidSnapshots.light[1 - sceenshot] : androidSnapshots.dark[1 - sceenshot]} style={{margin: '10px'}}/>
        </div>
      </CSSTransition>
      <Footer />
    </>
  );
};

export default App;