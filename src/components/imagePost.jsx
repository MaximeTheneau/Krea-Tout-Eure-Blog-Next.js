
import styles from '../styles/Image.module.scss';

import Image from 'next/image';


export default function imagePost({ imgPost, imgPost2, imgPost3, imgPost4, title }) {
  return (
    <>
        <div className={styles['post-card']} >
            <div>
              <Image
                src={imgPost.path}
                width={imgPost.width}
                height={imgPost.height}
                className={styles['post-card__img']}
              />
                {imgPost2 && (
                  <Image
                  src={imgPost2.path}
                  alt={title}
                  width={imgPost2.width}
                  height={imgPost2.height}
                  className={styles['post-card__img']}
                />)}
              {imgPost3 && (
                <Image
                  src={imgPost3.path}
                  alt={title}
                  width={imgPost3.width}
                  height={imgPost3.height}
                  className={styles['post-card__img']}
                />
              )}
              {imgPost4 && (
                <Image
                  src={imgPost4.path}
                  alt={title}
                  width={imgPost4.width}
                  height={imgPost4.height}
                  className={styles['post-card__img']}
                />
              )}

            </div>
        </div>


    </>
    
  )
}
