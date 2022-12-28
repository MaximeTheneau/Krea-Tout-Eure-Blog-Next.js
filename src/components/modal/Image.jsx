import Image from 'next/image';
import PropTypes from 'prop-types';

import styleModal from '../../styles/Modal.module.scss';

export default function ImageModal({
  path, width, height, title, onClickModal,
}) {
  return (
    <div className={styleModal.modal__images}>
      <Image
        src={path}
        alt={`image ${title} au format ${width}x${height}`}
        width={width}
        height={height}
        sizes="100vw"
        style={{
          width: 'auto',
          height: 'auto',
        }}
        className={styleModal.modal__images__relative__img}
        onClick={onClickModal}
      />
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
