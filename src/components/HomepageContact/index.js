import React from 'react';
import clsx from 'clsx';
import styles from './HomepageContact.module.scss';

const contactList = [
  {
    title: 'Discord', 
    imgUrl: '../../../static/img/discord.png',
    link: 'https://discord.com/invite/kRc2N2M',
  },
  {
    title: 'Github',
    imgUrl: '../../../static/img/github.png',
    link: 'https://github.com/kyanvasu',
  },
  {
    title: 'Email',
    imgUrl: '../../../static/img/email.png',
    link: 'mailto:contact@kanvas.dev',
  },
];

export default function HomepageContact() {
  return (
    <section className={clsx('text--center', styles.contactSection)}>
      <div className="container">
        <h3 className="margin-bottom--lg">
          Connect with Us
        </h3>
        <div className={styles.contactList}>
          {contactList.map(({title, imgUrl, link}, idx) => (
            <a key={idx} href={link}>
              <img src={imgUrl} alt={title} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}