import Head from 'next/head';
import Image from 'next/image';
import styles from '../src/styles/Pages.module.scss';

export async function getStaticProps() {
  const res = await fetch('http://localhost:8000/api/pages/qui-sommes-nous');
  const pageAbout = await res.json();
  return { props: { pageAbout } };
}

export default function QuiSommesNous({ pageAbout }) {
  const descriptionMeta = pageAbout.contents === null
    ? `Articles de blog ${pageAbout.title}`
    : `${pageAbout.contents.substring(0, 155).replace(/[\r\n]+/gm, '')}...`;

  return (
    <div>
      <Head>
        <title>{pageAbout.subtitle}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageAbout.subtitle} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content="https://kreatouteure.fr" />
        <meta property="og:image" content={pageAbout.imgHeader.path} />
      </Head>
      <header>
        <Image
          src={pageAbout.imgHeader.path}
          alt={pageAbout.title}
          width={pageAbout.imgHeader.width}
          height={pageAbout.imgHeader.height}
          layout="intrinsic"
        />
        <h1>{pageAbout.title}</h1>
      </header>
      <main>
        <div className={`card ${styles.pages}`}>
          <p>{pageAbout.contents}</p>
        </div>
      </main>
    </div>
  );
}
