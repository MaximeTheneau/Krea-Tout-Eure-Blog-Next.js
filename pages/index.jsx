import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Thumbnail from '../src/components/thumbnail';
import styles from '../src/styles/Home.module.scss';

export async function getStaticProps() {
  const resBase64 = await fetch('http://localhost:8000/api/placeholder');
  const base64 = await resBase64.json();

  const resPost = await fetch('http://localhost:8000/api/posts/thumbnail');
  const thumbnail = await resPost.json();

  const res = await fetch('http://localhost:8000/api/pages/Accueil');
  const pageHome = await res.json();

  return { props: { pageHome, thumbnail, base64 } };
}

export default function Index({ thumbnail, base64, pageHome }) {
  return (
    <>
      <Head>
        <title>{pageHome.subtitle}</title>
        <meta name="description" content={pageHome.contents2} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageHome.subtitle} />
        <meta property="og:description" content={pageHome.contents2} />
        <meta property="og:site_name" content="https://kreatouteure.fr" />
        <meta property="og:image" content={pageHome.imgHeader.path} />
      </Head>

      <header className={styles.home__header}>
        <div className={`card ${styles.home__header__card}`}>
          <div className={styles.home__header__card__img}>
            <Image
              src={pageHome.imgHeader.path}
              alt={`logo ${pageHome.subtitle}`}
              width={250}
              height={250}
              style={{ width: 'auto', height: 'auto' }}
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
          thumbnail.map((post) => (
            <Thumbnail key={post.id} {...post} {...base64} />
          ))
        }
      </div>
    </>
  );
}
