import { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import ImageModal from './modal/Image';
import TricotSvg from './tricotSvg';
import handleMouseCard from '../libs/handleMouseCard';

import styles from '../styles/Article.module.scss';

export default function ImagePost({
  imgPost, imgPost2, imgPost3, imgPost4, title, base64,
}) {
  const [toggleModal, setToggleModal] = useState(false);
  const [viewImg, setImgView] = useState('');
  const arrayImg = [imgPost, imgPost2, imgPost3, imgPost4];

  const onClickModal = (evt, titleEvt) => {
    setImgView({
      path: evt.path,
      width: evt.width,
      height: evt.height,
      title: titleEvt,
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
          title={viewImg.title}
          onClickModal={onClickModal}
        />
      ) : ''}
      {arrayImg.map((img) => img && (
        <div className={styles.posts__images__thumbnail} >
          <div className="defensive" >
            <TricotSvg />
          </div>
          <Image
            key={img.path}
            src={img.path}
            width={img.width}
            height={img.height}
            alt={title}
            style={{
              width: '250px', height: '250px', objectFit: 'cover', maxWidth: '100%', maxHeight: '100%',
            }}
            placeholder="blur"
            blurDataURL={`data:image/jpeg;base64,/${base64}`}
            className={styles.posts__images__img}
            onClick={() => onClickModal(img, title)}
          />
        </div>
      ))}
    </>
  );
}

ImagePost.propTypes = {
  imgPost: PropTypes.shape({
    path: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  imgPost2: PropTypes.shape({
    path: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  imgPost3: PropTypes.shape({
    path: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  imgPost4: PropTypes.shape({
    path: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  title: PropTypes.string,
  base64: PropTypes.string,
};

ImagePost.defaultProps = {
  imgPost2: null,
  imgPost3: null,
  imgPost4: null,
  title: '',
  base64: '',
};
