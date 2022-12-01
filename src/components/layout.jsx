// components/layout.js
import { useEffect, useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import Cookies from './modal/Cookies';

export default function Layout({ children }) {
  const [cookiesModal, setCookiesModal] = useState(false);
  useEffect(() => {
    const cookies = window.localStorage.getItem('cookies');
    function cookiesStorage(name) {
      if (name === null) {
        console.log(name);
        setTimeout(() => {
          setCookiesModal(true);
        }, 1000);
      }
      return '';
    }
    cookiesStorage(cookies);
  }, []);

  return (
    <>
      {cookiesModal ? <Cookies setCookiesModal={setCookiesModal} /> : ''}
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
