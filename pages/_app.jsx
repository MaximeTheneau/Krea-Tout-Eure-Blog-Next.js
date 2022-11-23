
import Layout from '../src/components/layout'
import '../src/styles/globals.scss'



export default function MyApp({ Component, pageProps }) {


  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}
