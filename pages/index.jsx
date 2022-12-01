import Image from 'next/image';
import Link from 'next/link';
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
      <header className={styles.home__header}>
        <div className={styles.home__header__card}>
          <div className={styles.home__header__card__img}>
            <Image
              src={pageHome.imgHeader.path}
              alt="Logo Kréa Tout Eure"
              width={250}
              height={250}
              layout="intrinsic"
            />
          </div>
          <div className={styles.home__header__card__contents}>
            <h1>Kréa Tout Eure, le Blog</h1>
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
