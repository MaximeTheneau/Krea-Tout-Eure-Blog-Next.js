import { useEffect, useState } from 'react';
import Layout from '../src/components/layout';
import '../src/styles/globals.scss';
import Cookies from '../src/components/modal/Cookies';

export default function MyApp({ Component, pageProps }) {
  const [cookiesModal, setCookiesModal] = useState(false);

  useEffect(() => {
    function cookiesStorage(cookiesModalParam) {
      if (cookiesModalParam === null) {
        setTimeout(() => {
          setCookiesModal(true);
        }, 1000);
      } if (cookiesModalParam === false && cookiesModalParam === true) {
        setCookiesModal(false);
      }
      return '';
    }

    const cookiesModalParam = window.localStorage.getItem('cookiesModal');
    const cookiesGoogleParam = window.localStorage.getItem('cookiesGoogle');

    cookiesStorage(cookiesModalParam, cookiesGoogleParam);
  }, []);

  return (
    <>
      {cookiesModal ? <Cookies setCookiesModal={setCookiesModal} /> : ''}
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
