
import styles from '../styles/Thumbnail.module.scss';

import Link from 'next/link';
import Image from 'next/image';

export default function thumbnail({ imgThumbnail, title, slug }) {

  return (
    <>
        <div className={styles['thumbnail-card']} >
            <Link href={`/articles/${slug}`}>
            
                <Image 
                    src={imgThumbnail}
                    alt={title} 
                    width={250} 
                    height={250}
                    className={styles['thumbnail-card__img']}
                />
                <h2 className={styles['thumbnail-card__title']}>{title}</h2>
            </Link>
        </div>


    </>
    
  )
}
