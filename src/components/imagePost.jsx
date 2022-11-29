import { useState } from 'react';
import Image from 'next/image';
import ImageModal from './modal/Image';
import styles from '../styles/Image.module.scss';

export default function ImagePost({
  imgPost, imgPost2, imgPost3, imgPost4, title, base64,
}) {
  const [toggleModal, setToggleModal] = useState(false);
  const [viewImg, setImgView] = useState('');
  const arrayImg = [imgPost, imgPost2, imgPost3, imgPost4];

  const onClickModal = (evt) => {
    setImgView({
      path: evt.path,
      width: evt.width,
      height: evt.height,
      title: evt.title,
    });
    setToggleModal(!toggleModal);
  };
  return (
    <>
      {toggleModal ? (
        <ImageModal
          path={viewImg.path}
          width={viewImg.width}
          height={viewImg.height}
          title={viewImg.alt}
          onClickModal={onClickModal}
        />
      ) : ''}
      {arrayImg.map((img) => img && (
        <div className={styles.image}>
          <Image
            src={img.path}
            width={img.width}
            height={img.height}
            alt={title}
            layout="responsive"
            placeholder="blur"
            blurDataURL={`data:image/jpeg;base64,/${base64}`}
            className={styles['post-card__img']}
            onClick={() => onClickModal(img)}
          />
        </div>
      ))}
    </>
  );
}
