import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`IFLA Standards Workspace`}
      description="A collaborative platform for IFLA Review Group members and editors">
      <Hero />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
