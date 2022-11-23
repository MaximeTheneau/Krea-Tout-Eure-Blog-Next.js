
import { useEffect, useState } from 'react'
import Layout from '../src/components/layout'
import '../src/styles/globals.scss'



export default function MyApp({ Component, pageProps, postProps }) {


  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <Layout {...pageProps} pagesProps={pageProps} >
      <Component {...pageProps} pageProps={postProps} />
    </Layout>
  )
}
