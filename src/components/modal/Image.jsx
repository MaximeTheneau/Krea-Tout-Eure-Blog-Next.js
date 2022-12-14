import Image from 'next/image';
import PropTypes from 'prop-types';

import styleModal from '../../styles/Modal.module.scss';

export default function ImageModal({
  path, width, height, title, onClickModal,
}) {
  return (
    <div className={styleModal.modal__images}>
      <div
        className={styleModal.modal__images__relative}
        style={{
          width,
          height,
        }}
      >
        <Image
          src={path}
          alt={`image ${title} au format ${width}x${height}`}
          width={width}
          height={height}
          sizes="100vw"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
          }}
          className={styleModal.modal__images__relative__img}
        />
        <div
          className={styleModal.modal__images__relative__close}
          onClick={onClickModal}
          aria-hidden="true"
        >
          <i className="icon-close-white" />
        </div>
      </div>
    </div>
  );
}

ImageModal.propTypes = {
  path: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onClickModal: PropTypes.func.isRequired,
};
