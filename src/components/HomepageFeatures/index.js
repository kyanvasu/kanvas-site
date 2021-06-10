import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.scss';

const FeatureList = [
  {
    title: 'Multi App Ecosystem', 
    imgUrl: '../../../static/img/feature_1.png',
    description: (
      <>
        You can go from just 1 app to multiple with a simple click.
      </>
    ),
  },
  {
    title: 'Rapid CRUD development',
    imgUrl: '../../../static/img/feature_2.png',
    description: (
      <>
        No more custom code for your cruds.
      </>
    ),
  },
  {
    title: 'SaaS BoilerPlate',
    imgUrl: '../../../static/img/feature_3.png',
    description: (
      <>
        Save time to market developing you next big thing
      </>
    ),
  },
];

function Feature({imgUrl, title, description}) {
  return (
    <div className={clsx('col col--4 margin-bottom--xl', styles.feature)}>
      <div className={clsx('margin-bottom--lg text--center', styles.featureImage)}> 
        <img src={imgUrl} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
