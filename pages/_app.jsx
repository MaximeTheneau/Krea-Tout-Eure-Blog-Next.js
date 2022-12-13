import { useEffect, useState } from 'react';
import Layout from '../src/components/layout';
import '../src/styles/globals.scss';
import Cookies from '../src/components/modal/Cookies';

export default function MyApp({ Component, pageProps }) {
  const [cookiesModal, setCookiesModal] = useState(false);
  const [background, setBackground] = useState(null);
  useEffect(() => {
    async function getBacground() {
      const response = await fetch('http://localhost:8000/api/placeholder');
      const data = await response.json();
      return setBackground(data[1].imgBase64);
    }

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
    getBacground();
  }, []);
  return (
    <>
      <style jsx>
        {`
        .background {
          background: url(${background}) repeat fixed;
          background-size: 50%;
          min-height: 100vh;
        }
      `}

      </style>
      {cookiesModal ? <Cookies setCookiesModal={setCookiesModal} /> : ''}
      <div className="background">
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  );
}
