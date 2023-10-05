import Head from 'next/head';
import PropTypes from 'prop-types';
import Image from 'next/image';
import styles from '../styles/Pages.module.scss';

export async function getStaticProps() {
  const res = await fetch('https://back.krea-tout-eure.fr/api/pages/qui-sommes-nous');
  const pageAbout = await res.json();
  return { props: { pageAbout } };
}

export default function QuiSommesNous({ pageAbout }) {
  const descriptionMeta = pageAbout.contents === null
    ? `Articles de blog ${pageAbout.title}`
    : `${pageAbout.contents.substring(0, 155).replace(/[\r\n]+/gm, '')}...`;

  return (
    <>
      <Head>
        <title>{pageAbout.title}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageAbout.title} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content="https://kreatouteure.fr" />
        <meta property="og:image" content={pageAbout.imgHeader.path} />
      </Head>
      <header className={`${styles.pages__header} card`}>
        <h1>{pageAbout.title}</h1>
        <Image
          src={pageAbout.imgHeader.path}
          alt={pageAbout.title}
          width={pageAbout.imgHeader.width}
          height={pageAbout.imgHeader.height}
          style={{ width: 'auto', height: 'auto' }}
          priority
        />
      </header>
      <main className={`${styles.pages__main} card`}>
        <h2>{pageAbout.subtitle}</h2>
        <p>{pageAbout.contents}</p>
      </main>
    </>
  );
}

QuiSommesNous.propTypes = {
  pageAbout: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
    imgHeader: PropTypes.shape({
      path: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
