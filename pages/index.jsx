import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Thumbnail from '../src/components/thumbnail';
import styles from '../src/styles/Home.module.scss';
import TricotSvg from '../src/components/tricotSvg';
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());


export async function getStaticProps() {
    const res = await fetch('http://localhost:8000/api/pages/Accueil');
    const pageHome = await res.json();
    return { props: {  pageHome } };
}

export default function Index({  pageHome }) {
  const descriptionMeta = pageHome.contents === null
    ? `Articles de blog ${pageHome.title}`
    : `${pageHome.contents.substring(0, 155).replace(/[\r\n]+/gm, '')}...`;
    const { data, error } = useSWR('http://localhost:8000/api/posts/thumbnail', fetcher);
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    console.log(data);
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
        <meta property="og:image" content={pageHome.imgHeader.path} />
      </Head>

      <header className={styles.home__header}>
        <div className={`card ${styles.home__header__card}`}>
          <div className={styles.home__header__card__img}>
            
            <Image
              src={pageHome.imgHeader.path}
              alt={`logo ${pageHome.subtitle}`}
              width={500}
              height={500}
              style={{ width: 'auto', height: 'auto' }}
              lazy
            />
          </div>
          <div className={styles.home__header__card__contents}>
            <h1>{pageHome.subtitle}</h1>
          </div>
          <div className={styles.home__header__card__contents2}>
            <p>{pageHome.contents}</p>
            <Link href="/qui-sommes-nous">
              <button type="button" className="button-glass">En savoir plus</button>
            </Link>
          </div>
        </div>
      </header>
      <div className={styles.home__cards}>
        {
          data.map((post) => (
            <Thumbnail
              key={post.id}
              imgThumbnail={post.imgThumbnail}
              title={post.title}
              slug={post.slug}
            />
          ))
        }
      </div>
    </>
  );
}
Index.propTypes = {
  thumbnail: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    imgThumbnail: PropTypes.string.isRequired,
  })).isRequired,
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
