import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Main App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Forethought IFrame Solutions Prototype</h1>

        <p className={styles.description}>
          Experiments different solutions handling widget transitions.
        </p>

        <div className={styles.grid}>
          <Link href="/iframe-composition">
            <a className={styles.card}>
              <h2>Single Iframe Composition</h2>
              <p>Use Single Iframe/Single PWA to handle state change</p>
            </a>
          </Link>

          <Link href="/react-portal">
            <a className={styles.card}>
              <h2>React Portal</h2>
              <p>
                (WIP) Use Single Iframe/Single PWA but mount in different root
              </p>
            </a>
          </Link>

          <Link href="/multiple-iframe">
            <a className={styles.card}>
              <h2>Multiple Iframe</h2>
              <p>
                (WIP) Use Multiple Iframe/Multiple PWA controlled by centralized
                js
              </p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
