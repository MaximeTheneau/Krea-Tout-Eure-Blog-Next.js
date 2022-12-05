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
      }

      if (cookiesModalParam === true) {
        setCookiesModal(false);
      }
      return '';
    }
    const cookiesModalParam = window.localStorage.getItem('cookiesModal');
    cookiesStorage(cookiesModalParam);
  }, []);

  return (
    <>
      {cookiesModal ? <Cookies setCookiesModal={setCookiesModal} /> : ''}
      <div className="background">
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  );
}
