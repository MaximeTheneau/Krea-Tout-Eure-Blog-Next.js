import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Thumbnail.module.scss';

export default function thumbnail({
  imgThumbnail, title, slug, base64,
}) {
  return (
    <div className={styles['thumbnail-card']}>
      <Link href={`/articles/${slug}`}>
        <Image
          src={imgThumbnail}
          alt={title}
          width={250}
          height={250}
          placeholder="blur"
          blurDataURL={`data:image/jpeg;base64,/${base64}`}
          className={styles['thumbnail-card__img']}
          layout="responsive"
        />
        <h2 className={styles['thumbnail-card__title']}>{title}</h2>
      </Link>
    </div>

  );
}
