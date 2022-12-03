import Image from 'next/image';
import styleModal from '../../styles/Modal.module.scss';

export default function ImageModal({
  path, width, height, title, onClickModal,
}) {
  return (
    <div className={styleModal.modal__images}>
      <div className={styleModal.modal__images__relative}>
        <div className="relative" style={{ width, height, margin: '0 auto' }}>
          <Image
            src={path}
            alt="modal"
            responsives="true"
            width={width}
            height={height}
            style={{
              width: 'auto', height: 'auto',
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
    </div>
  );
}
