import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.scss';

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>My OWL Top</title>
        <link rel="icon" href="/favicon.ico" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="theme-color" content="#111111"></meta>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
        <meta property="og:locale" content="ru_RU"/>
      </Head>
      <Component {...pageProps} />
    </>
  );

}

export default MyApp;
