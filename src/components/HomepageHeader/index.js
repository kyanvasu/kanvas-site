import React from 'react';
import clsx from 'clsx';
import styles from './HomepageHeader.module.scss';

export default function HomepageHeader() {
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <h1>
          Bringing back the <span>Love</span> to our daily <span>Dev life</span> one component at a time
        </h1>
        <p>
        Open source smart code development solution, focused on developing SaaS development components so you can focus on the problem at hand.
        </p>
      </div>
    </header>
  );
}