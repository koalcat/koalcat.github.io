import React, { useEffect, useMemo, useState } from 'react';
import Header from '../header';
import Footer from '../footer';
import Phone from '../devices';
import Download from './download';
import Feedback from './email';
import info from './discription.json';
import AppInfo from './android.json';
import styles from './index.module.less';

const icon = require('./app-icon.png');

const iosFrames: string[] = [
  require('./snapshot1.png'),
  require('./snapshot2.png'),
  require('./snapshot3.png'),
  require('./snapshot4.png'),
];

// Same order as iosFrames, but shifted so the pair always shows one dark and one light screen.
const androidFrames: string[] = [
  require('./snapshot3a.png'),
  require('./snapshot4a.png'),
  require('./snapshot1a.png'),
  require('./snapshot2a.png'),
];

const features = [
  {
    title: '离线缓存',
    text: '帖子读过后存在本地，没网也能接着往下翻。',
  },
  {
    title: '深色模式',
    text: '跟随系统或手动切换，晚上刷帖不刺眼。',
  },
  {
    title: '动图表情',
    text: '帖子里的 GIF 表情照常播放，跟在网页版看到的一样。',
  },
];

const marqueeItems = ['S1Fun', '华语第三动漫论坛', '离线缓存', '深色模式', '动图表情', 'stage1st.com'];

const version = AppInfo.version.replace(/\s*build.*$/, '');
const changelog = AppInfo.notice
  .split('\n')
  .map(line => line.replace(/^[-*]\s*/, '').trim())
  .filter(Boolean);

const S1: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false,
    [],
  );

  useEffect(() => {
    if (reduced) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setFrame(current => (current + 1) % iosFrames.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <div className={styles.page} id="top">
      <Header version={version} build={AppInfo.versionInt} />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                非官方 · 华语第三动漫论坛客户端
              </p>
              <h1 className={styles.h1}>
                <span>又一个</span>
                <span>
                  <em>S1</em> 客户端
                </span>
              </h1>
              <p className={styles.lede}>{info.description}</p>
              <Download size={AppInfo.size} />
            </div>

            <aside className={styles.specCard} aria-label="S1Fun 版本信息">
              <div className={styles.specHead}>
                <img className={styles.appIcon} src={icon} alt="" width={52} height={52} />
                <div>
                  <p className={styles.specName}>S1Fun</p>
                  <p className={styles.specSub}>Stage1st Client</p>
                </div>
              </div>
              <dl className={styles.specList}>
                <div className={styles.specRow}>
                  <dt>版本</dt>
                  <dd>{AppInfo.version}</dd>
                </div>
                <div className={styles.specRow}>
                  <dt>更新</dt>
                  <dd>{AppInfo.time}</dd>
                </div>
                <div className={styles.specRow}>
                  <dt>大小</dt>
                  <dd>{AppInfo.size}</dd>
                </div>
                <div className={styles.specRow}>
                  <dt>平台</dt>
                  <dd>Android · iOS</dd>
                </div>
              </dl>
              {changelog.length ? (
                <div className={styles.specNote}>
                  <span className={styles.specNoteLabel}>更新说明</span>
                  <ul className={styles.changelog}>
                    {changelog.map(line => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>
        </section>

        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.track}>
            {[0, 1].map(copy => (
              <div className={styles.marqueeGroup} key={copy}>
                {marqueeItems.map(item => (
                  <React.Fragment key={item}>
                    <span>{item}</span>
                    <i className={styles.dot} />
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className={styles.gallery} id="preview">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndex}>02</span>
              <h2 className={styles.sectionTitle}>界面预览</h2>
              <span className={styles.sectionNote}>深色 / 浅色</span>
            </div>
            <div className={styles.devices}>
              <figure className={styles.device}>
                <Phone type="iphone" screens={iosFrames} active={frame} />
                <figcaption className={styles.caption}>
                  <b>iOS</b>
                  <span className={styles.sep}>·</span>
                  <span>深色 / 浅色自动切换</span>
                </figcaption>
              </figure>
              <figure className={styles.device}>
                <Phone type="android" screens={androidFrames} active={frame} />
                <figcaption className={styles.caption}>
                  <b>Android</b>
                  <span className={styles.sep}>·</span>
                  <span>同一套界面</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndex}>03</span>
              <h2 className={styles.sectionTitle}>一些细节</h2>
              <span className={styles.sectionNote}>Why S1Fun</span>
            </div>
            <div className={styles.featureGrid}>
              {features.map((feature, index) => (
                <article className={styles.feature} key={feature.title}>
                  <span className={styles.featureIndex}>{`0${index + 1}`}</span>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureText}>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.feedback} id="feedback">
          <Feedback />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default S1;
