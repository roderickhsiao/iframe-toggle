import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

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
              <p>Use Single Iframe/Single PWA to handle state change, use SwitchTransition</p>
            </a>
          </Link>

          <Link href="/iframe-composition-switch">
            <a className={styles.card}>
              <h2>Single Iframe Switch Layout</h2>
              <p>
                Toggle two layout using CSSTransition
              </p>
            </a>
          </Link>

          <Link href="/iframe-composition-multiple">
            <a className={styles.card}>
              <h2>Multiple Iframe</h2>
              <p>
                Use Multiple Iframe/Multiple PWA controlled by centralized
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
