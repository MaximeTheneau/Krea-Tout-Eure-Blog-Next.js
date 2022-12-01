import { useEffect } from 'react';
import Layout from '../src/components/layout';
import '../src/styles/globals.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout {...pageProps} >
      <Component {...pageProps} />
    </Layout>
  )
}
