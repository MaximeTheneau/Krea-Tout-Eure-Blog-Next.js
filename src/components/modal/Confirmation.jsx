import styleModal from '../../styles/Modal.module.scss';

export default function confirmation({onClickConfirmation}) {
  setTimeout(() => {
    onClickConfirmation();
  }, 10000);
  return (

    <div className={styleModal.modal}>
      <h2>Bien Reçu, merci !</h2>
      <p>Votre message a bien été envoyé, on vous réponds aux plus vite</p>
      <div>
        <button
          type="button"
          className="button-submit"
          onClick={onClickConfirmation}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
