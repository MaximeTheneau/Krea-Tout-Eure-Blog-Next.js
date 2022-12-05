import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Layout from '../src/components/layout';
import '../src/styles/globals.scss';
import Cookies from '../src/components/modal/Cookies';

const fetcher = (url) => fetch(url).then((res) => res.json());

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

  const { data, error } = useSWR('http://localhost:8000/api/placeholder', fetcher);
  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';

  const style = {
    /*background: `url(${data[1].imgBase64})fixed repeat `,
    backgroundSize: 'contain',*/
  };

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
