import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import ym, { YMInitializer } from 'react-yandex-metrika';
import '../styles/globals.scss';

Router.events.on('routeChangeComplete', (url: string) => {
  if (typeof window !== 'undefined') {
    ym('hit', url);
  }
});

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {

  return (
    <>
      <Head>
        <title>My OWL Top</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#111111" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
        <meta property="og:locale" content="ru_RU" />
      </Head>
      <YMInitializer
        accounts={[]}
        options={{
          webvisor: true,
          defer: true,
        }}
        version="2"
      />
      <Component {...pageProps} />
    </>
  );

}

export default MyApp;
