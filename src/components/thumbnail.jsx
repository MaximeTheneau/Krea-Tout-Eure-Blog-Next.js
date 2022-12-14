/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from '../styles/Thumbnail.module.scss';
import TricotSvg from './tricotSvg';
import handleMouseCard from '../libs/handleMouseCard';

export default function thumbnail({
  imgThumbnail, title, slug,
}) {
  const lengthTitle = title.length > 30 ? `${title.substring(0, 30)}...` : title;
  return (
    <Link href={`/articles/${slug}`}>
      <div
        className={`card ${styles.thumbnail}`}
        onMouseMove={handleMouseCard}
        onMouseLeave={handleMouseCard}
        onMouseEnter={handleMouseCard}
      >
        <div className="defensive">
          <TricotSvg />
        </div>
        <div className={styles.thumbnail__img}>
          <img
            src={imgThumbnail}
            alt={title}
            width="250"
            height="250"
          />
        </div>
        <div className={styles.thumbnail__contents}>
          <h2 className={styles.thumbnail__contents__title}>{lengthTitle}</h2>
        </div>
      </div>
    </Link>
  );
}
