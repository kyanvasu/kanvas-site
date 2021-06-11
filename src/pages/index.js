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
      title={`${siteConfig.title}`}
      description="Open source smart code development solution, focused on developing SaaS development components so you can focus on the problem at hand.">
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
