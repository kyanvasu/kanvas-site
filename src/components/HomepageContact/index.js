import React from 'react';
import clsx from 'clsx';
import styles from './HomepageContact.module.scss';

const contactList = [
  {
    title: 'Discord', 
    image: require('@site/static/img/discord.png').default,
    link: 'https://discord.com/invite/kRc2N2M',
  },
  {
    title: 'Github',
		image: require('@site/static/img/github.png').default,
    link: 'https://github.com/kyanvasu',
  },
  {
    title: 'Email',
		image: require('@site/static/img/email.png').default,
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
          {contactList.map(({title, image, link}, idx) => (
            <a key={idx} href={link}>
              <img src={image} alt={title} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}