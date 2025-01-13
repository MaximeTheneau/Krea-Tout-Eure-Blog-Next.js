import Image from 'next/image';
import useSWR from 'swr';
import Link from 'next/link';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Thumbnail from '../components/thumbnail';
import styles from '../styles/Home.module.scss';
import TricotSvg from '../components/tricotSvg';
import fetcher from '../libs/fetcher';

const urlThumbnail = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/thumbnail`;

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/Accueil`);
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
        <meta property="og:locale" content="fr_FR" />

      </Head>
      <link
        rel="canonical"
        href="https://krea-tout-eure.fr"
        key="canonical"
      />
      <section className={`card ${styles.home__header}`}>
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
      </section>
      <section>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Notre Mission
            </h2>
            <p className="text-gray-600 mb-4">
              Créée en 2017, Kréa Tout Eure accompagne les personnes sorties de longue 
              maladie ou d'un épisode dépressif dans leur reconstruction personnelle à 
              travers le tricot.
            </p>
            <p className="text-gray-600">
              Nous croyons que le tricot est bien plus qu'un passe-temps - c'est un art 
              thérapeutique qui permet de créer tout en prenant soin de soi et en tissant 
              des liens avec les autres.
            </p>
            <ul>
              <li>✨ <strong>Reconstruire par le tricot :</strong> Offrir un espace pour reprendre confiance en soi.</li>
              <li>✨ <strong>Créer et partager :</strong> Découvrir le plaisir de fabriquer des pièces uniques.</li>
              <li>✨ <strong>Tisser des liens :</strong> Rejoindre une communauté bienveillante, que vous soyez débutant ou expert.</li>
            </ul>
          </section>
        <section>
          <h2>Articles Populaires</h2>
        <div className={styles.home__cards}>
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
        </div>
      </section>
      {/* Join Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold mb-6">Rejoignez-nous</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Que vous soyez débutant ou expert, notre association est ouverte à tous ceux 
            qui souhaitent partager leur passion du tricot dans un cadre bienveillant.
          </p>
              <Link
                href="/contact"
              >
                <button type="button" className="button-glass">Contactez-nous</button>
              </Link>
        </div>
      </section>

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
