import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageHeader from '@site/src/components/HomepageHeader'
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageContact from '@site/src/components/HomepageContact';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <hr />
      <main>
        <HomepageFeatures />
        <hr />
        <HomepageContact />
      </main>
    </Layout>
  );
}
