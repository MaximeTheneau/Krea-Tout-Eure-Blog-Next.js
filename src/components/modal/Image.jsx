import Image from 'next/image';
import styleModal from '../../styles/Modal.module.scss';

export default function ImageModal({
   path, width, height, title, onClickModal
}) {
  return (
    <div className={styleModal.modal}>
      <Image
        src={path}
        width={width}
        height={height}
        alt={title}
        layout="responsive"
        className={styleModal['modal__img']}
      />
      <div
        className={styleModal.close}
        onClick={onClickModal}
        aria-hidden="true"
      >
        <i className="icon-x" />
      </div>
    </div>
  );
}
