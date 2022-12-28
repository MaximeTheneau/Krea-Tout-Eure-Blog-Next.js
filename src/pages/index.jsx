import Image from 'next/image';
import useSWR from 'swr';
import Link from 'next/link';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Thumbnail from '../components/thumbnail';
import styles from '../styles/Home.module.scss';
import TricotSvg from '../components/tricotSvg';
import fetcher from '../libs/fetcher';

const urlThumbnail = 'http://localhost:8000/api/posts/thumbnail';

export async function getStaticProps() {
  const res = await fetch('http://localhost:8000/api/pages/Accueil');
  const pageHome = await res.json();
  return { props: { pageHome } };
}

// eslint-disable-next-line @next/next/no-typos
export async function getServersideProps() {
  const data = await fetcher(urlThumbnail);
  return { props: { thumbnail: data } };
}

export default function Index({ pageHome, thumbnail }) {
  const dataThumbnail = useSWR(urlThumbnail, fetcher, { thumbnail }).data;

  const descriptionMeta = pageHome.contents === null
    ? `Articles de blog ${pageHome.title}`
    : `${pageHome.contents.substring(0, 155).replace(/[\r\n]+/gm, '')}...`;

  const encodeJpg = (path) => {
    const pathJpg = path.replace(/.webp/g, '.jpg');
    return pathJpg;
  };

  return (
    <>
      <Head>
        <title>{pageHome.subtitle}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageHome.subtitle} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content="https://krea-tout-eure.fr" />
        <meta property="og:image" content={encodeJpg(pageHome.imgHeader.path)} />
      </Head>

      <header className={`card ${styles.home__header}`}>
        <div className={styles.home__header__card}>
          <div className={styles.home__header__card__img}>
            <Image
              src={pageHome.imgHeader.path}
              alt={`logo ${pageHome.subtitle}`}
              width={500}
              height={500}
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </div>
          <div className={styles.home__header__card__contents}>
            <h1>{pageHome.subtitle}</h1>
            <div className={styles.home__header__card__contents2}>
              <p>{pageHome.contents}</p>
              <Link
                href="/qui-sommes-nous"
              >
                <button type="button" className="button-glass">En savoir plus</button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className={styles.home__cards}>
        {
          dataThumbnail !== undefined
            ? dataThumbnail.map((post) => (
              <Thumbnail
                key={post.id}
                imgThumbnail={post.imgThumbnail}
                title={post.title}
                slug={post.slug}
              />
            ))
            : <TricotSvg />
        }
      </main>
    </>
  );
}
Index.propTypes = {
  thumbnail: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    imgThumbnail: PropTypes.string.isRequired,
  }).isRequired,
  pageHome: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    contents: PropTypes.string,
    imgHeader: PropTypes.shape({
      path: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  }).isRequired,
};
