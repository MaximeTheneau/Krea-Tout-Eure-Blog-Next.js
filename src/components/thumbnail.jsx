import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Thumbnail.module.scss';

export default function thumbnail({
  imgThumbnail, title, slug, base64,
}) {
  const lengthTitle = title.length > 30 ? `${title.substring(0, 30)}...` : title;
  return (
    <div className={styles.thumbnail}>
      <div className={styles.thumbnail__defensive} />
      <Link href={`/articles/${slug}`}>
        <div className={styles.thumbnail__img}>
          <Image
            src={imgThumbnail}
            alt={title}
            width={250}
            height={250}
            placeholder="blur"
            blurDataURL={`data:image/jpeg;base64,/${base64}`}
            objectFit="intrinsic"
          />
        </div>
        <div className={styles.thumbnail__contents}>
          <h2 className={styles.thumbnail__contents__title}>{lengthTitle}</h2>
        </div>
      </Link>
    </div>

  );
}
