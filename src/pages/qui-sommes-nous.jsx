import Head from 'next/head';
import PropTypes from 'prop-types';
import Image from 'next/image';
import styles from '../styles/Pages.module.scss';
import Link from 'next/link';

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/qui-sommes-nous`);
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
      <main className={`${styles.pages__main} card`}>
      <section className={`${styles.pages__header} `}>
        <h1>{pageAbout.title}</h1>
        <Image
          src={pageAbout.imgHeader.path}
          alt={pageAbout.title}
          width={pageAbout.imgHeader.width}
          height={pageAbout.imgHeader.height}
          style={{ width: 'auto', height: 'auto' }}
          priority
        />
      </section>
        <h2>{pageAbout.subtitle}</h2>
        <p>{pageAbout.contents}</p>
         <section>
    <h2>Notre mission</h2>
    <p>
      L’objectif de Kréa Tout Eure est de faire découvrir le tricot et d’en faire une activité accessible à tous. Nous organisons régulièrement des ateliers, des événements et des rencontres afin de permettre à nos membres de partager leurs connaissances, leurs techniques et de se soutenir mutuellement dans leurs projets.    
    </p>
      </section>

      <section>
        <h2>Pourquoi le tricot ?</h2>
        <p>
          Le tricot est bien plus qu’un simple passe-temps : c’est un véritable art qui permet de créer de belles choses tout en favorisant la relaxation et en prenant soin de soi. C’est également un moyen puissant de se connecter aux autres et de faire partie d’une communauté bienveillante, solidaire et créative.
        </p>
      </section>

      <section>
        <h2>Rejoignez-nous</h2>
        <p>
  Que vous soyez débutant(e) ou expert(e), nous vous invitons à rejoindre Kréa Tout Eure. Venez partager votre passion du tricot, apprendre de nouvelles techniques, et faire partie d'une communauté dynamique et accueillante.
        </p>
        <Link
                href="/contact"
              >
                <button type="button" className="button-glass">Contactez-nous</button>
              </Link>
      </section>
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
