import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Main App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Forethought IFrame Solutions Prototype</h1>

        <p className={styles.description}>Experiments different solutions handling widget transitions.</p>

        <div className={styles.grid}>
          <a href="/iframe-composition" className={styles.card}>
            <h2>Single Iframe Composition</h2>
            <p>Use Single Iframe/Single PWA to handle state change</p>
          </a>

          <a href="/react-portal" className={styles.card}>
            <h2>React Portal</h2>
            <p>
              (WIP) Use Single Iframe/Single PWA but mount in different root
            </p>
          </a>

          <a href="/multiple-iframe" className={styles.card}>
            <h2>Multiple Iframe</h2>
            <p>
              (WIP) Use Multiple Iframe/Multiple PWA controlled by centralized
              js
            </p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
