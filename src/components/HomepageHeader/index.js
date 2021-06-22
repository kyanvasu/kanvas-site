import React from 'react';
// import clsx from 'clsx';
import styles from './HomepageHeader.module.scss';

export default function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroText}>
          <h1>
            Bringing back the <span>Love</span> to our daily <span>Dev life</span> one component at a time
          </h1>
          <p>
            Open source smart code development solution, focused on developing SaaS development components so you can focus on the problem at hand.
          </p>
        </div>

        <div className={styles.heroImages}>
          <div className={styles.heroImage1}>
            <img src={require('@site/static/img/header_1.png').default} />
          </div>
          <div className={styles.heroImage2}>
            <img src={require('@site/static/img/header_2.png').default} />
          </div>
        </div>
      </div>
    </header>
  );
}