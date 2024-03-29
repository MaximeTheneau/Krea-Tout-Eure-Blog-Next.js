import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import '../styles/globals.scss';
import Cookies from '../components/modal/Cookies';

export default function MyApp({ Component, pageProps }) {
  const [cookiesModal, setCookiesModal] = useState(false);
  const [background, setBackground] = useState('');
  useEffect(() => {
    async function getBacground() {
      const response = await fetch('https://back.krea-tout-eure.fr/api/placeholder');
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
      {cookiesModal ? <Cookies setCookiesModal={setCookiesModal} /> : ''}
      <div
        className="background"
        style={{
          background: `url(${background}) repeat fixed`,
        }}
      >
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};
