import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Home.module.css';

const Home = ({ title }: { title: string }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Main App</title>
      </Head>

      <header className="sticky w-full top-0 border-slate-200 border-b ">
        <div className="p-3 backdrop-blur-sm">
          <Image src="/logo.webp" width="220" height="52" />
        </div>
      </header>

      <main className={styles.main}>
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
          {title}
        </h1>

        <p className={styles.description}>
          Experiments different solutions handling widget transitions.
        </p>

        <div className={styles.grid}>
          <Link href="/iframe-composition">
            <a className={styles.card}>
              <h2>Single Iframe Composition</h2>
              <p>
                Use Single Iframe/Single PWA to handle state change, use
                SwitchTransition
              </p>
            </a>
          </Link>

          <Link href="/iframe-composition-switch">
            <a className={styles.card}>
              <h2>Single Iframe Switch Layout</h2>
              <p>Toggle two layout using CSSTransition</p>
            </a>
          </Link>

          <Link href="/iframe-composition-multiple">
            <a className={styles.card}>
              <h2>Multiple Iframe</h2>
              <p>
                Use Multiple Iframe/Multiple PWA controlled by centralized js
              </p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
