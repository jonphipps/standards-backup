import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`IFLA Standards Portal`}
      description="Access authoritative bibliographic standards developed by the International Federation of Library Associations and Institutions">
      <Hero />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
