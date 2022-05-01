import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const Home = ({
  title = 'IFrame Resize Prototype',
  note,
  description = 'Experiments different solutions handling widget transitions.',
}: {
  title?: string;
  note?: string;
  description?: string;
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen isolated">
      <Head>
        <title>{title}</title>
      </Head>

      <header className="sticky w-full top-0 border-slate-200 border-b ">
        <div className="p-3 backdrop-blur-sm">
          <Image src="/logo.webp" width="220" height="52" />
        </div>
      </header>

      <main className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 py-12">
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
          {title}
        </h1>

        <p className="my-6 max-w-3xl mx-auto text-lg text-center">
          {description}
        </p>

        {note && (
          <code className="flex-auto relative block text-slate-50 overflow-auto p-4 bg-black whitespace-pre-line">
            {note}
          </code>
        )}

        <ul className="bg-slate-50 p-4 lg:max-w-3xl mx-auto sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid sm:grid-cols-2 xl:grid-cols-2 gap-4 text-sm leading-6 dark:bg-slate-900/40 dark:ring-1 dark:ring-white/5">
          <li
            className={clsx(
              'group cursor-pointer rounded-md p-3 bg-white ring-1 ring-slate-200',
              'shadow-sm hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md',
              'dark:bg-slate-700 dark:ring-0 dark:highlight-white/10 dark:hover:bg-blue-500',
              {
                'ring-blue-500':
                  router.pathname === '/iframe-composition-switch',
              }
            )}
          >
            <Link href="/iframe-composition-switch">
              <a className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                <h2 className="font-semibold text-slate-900 group-hover:text-white dark:text-slate-100">
                  Single Iframe Switch Layout
                </h2>
                <p className="group-hover:text-blue-200">
                  Toggle two layout using CSSTransition
                </p>
              </a>
            </Link>
          </li>
          <li
            className={clsx(
              'group cursor-pointer rounded-md p-3 bg-white ring-1 ring-slate-200',
              'shadow-sm hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md',
              'dark:bg-slate-700 dark:ring-0 dark:highlight-white/10 dark:hover:bg-blue-500',
              {
                'ring-blue-500': router.pathname === '/iframe-composition',
              }
            )}
          >
            <Link href="/iframe-composition-group">
              <a className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                <h2 className="font-semibold text-slate-900 group-hover:text-white dark:text-slate-100">
                  Single Iframe TransitionGroup
                </h2>
                <p className="group-hover:text-blue-200">
                  Use Single Iframe/Single PWA to handle state change, use
                  TransitionGroup
                </p>
              </a>
            </Link>
          </li>
          <li
            className={clsx(
              'group cursor-pointer rounded-md p-3 bg-white ring-1 ring-slate-200',
              'shadow-sm hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md',
              'dark:bg-slate-700 dark:ring-0 dark:highlight-white/10 dark:hover:bg-blue-500',
              {
                'ring-blue-500': router.pathname === '/iframe-composition',
              }
            )}
          >
            <Link href="/iframe-composition">
              <a className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                <h2 className="font-semibold text-slate-900 group-hover:text-white dark:text-slate-100">
                  Single Iframe SwitchTransition
                </h2>
                <p className="group-hover:text-blue-200">
                  Use Single Iframe/Single PWA to handle state change, use
                  SwitchTransition
                </p>
              </a>
            </Link>
          </li>
          <li
            className={clsx(
              'group cursor-pointer rounded-md p-3 bg-white ring-1 ring-slate-200',
              'shadow-sm hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md',
              'dark:bg-slate-700 dark:ring-0 dark:highlight-white/10 dark:hover:bg-blue-500',
              {
                'ring-blue-500':
                  router.pathname === '/iframe-composition-multiple',
              }
            )}
          >
            <Link href="/iframe-composition-multiple">
              <a className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                <h2 className="font-semibold text-slate-900 group-hover:text-white dark:text-slate-100">
                  Multiple Iframe
                </h2>
                <p className="group-hover:text-blue-200">
                  Use Multiple Iframe/Multiple PWA controlled by centralized js
                </p>
              </a>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Home;
