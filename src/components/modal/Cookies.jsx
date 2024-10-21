import PropTypes from 'prop-types';
import { useState } from 'react';
import style from '../../styles/Modal.module.scss';

export default function Cookies({ setCookiesModal }) {
  const [state, setState] = useState({
    cookiesChoice: false,
    cookiesGoogle: false,
    cookiesModal: false,
  });

  function googleChoice() {
    return (
      <i
        className={`icon-${state.cookiesGoogle ? 'confirmation' : 'error'}`}
        onClick={() => {
          setState({ ...state, cookiesGoogle: !state.cookiesGoogle });
          window.localStorage.setItem('cookiesGoogle', !state.cookiesGoogle);
        }}
        role="presentation"
      />
    );
  }

  return (
    <div className={style.cookies}>
      {state.cookiesChoice ? (
        <div className={`card ${style.cookies__choice}`}>
          <h2>Les cookies</h2>
          <p>
            Les cookies sont Utilisé pour mesurer notre audience et améliorer nos contenus.
            <br />
            En désactivant les cookies, vous ne pourrez pas utiliser certaines fonctionnalités
            de notre site.
          </p>
          <div className={`card ${style.cookies__choice__table}`}>
            <div className={style.cookies__choice__table__row}>
              Tout cocher
            </div>
            <div className={style.cookies__choice__table__row}>
              {googleChoice()}
            </div>
          </div>
          <div className={`card ${style.cookies__choice__table}`}>
            <div className={style.cookies__choice__table__row}>
              Google Maps et Google Analytics
            </div>
            <div className={style.cookies__choice__table__row}>
              {googleChoice()}
            </div>
          </div>
          <div className={style.cookies__close}>
            <button
              type="button"
              onClick={() => {
                setState({
                  ...state,
                  cookiesGoogle: state.cookiesGoogle,
                });
                window.localStorage.setItem('cookiesGoogle', state.cookiesGoogle);
                window.localStorage.setItem('cookiesModal', false);
                setCookiesModal(false);
              }}
            >
              Je valide
            </button>

          </div>

        </div>
      ) : (
        <>
          <h2>
            Hey c'est nous...
            <span>Les Cookies !</span>
          </h2>
          <p>On aimerait bien vous accompagner pendant votre visite...</p>
          <p>...mais on a besoin de votre accord pour ça !</p>
          <div className={style.cookies__button}>
            <button
              type="button"
              className="button-glass"
              onClick={() => {
                setState({ ...state, cookiesChoice: true, cookiesGoogle: true });
                window.localStorage.setItem('cookiesGoogle', false);
              }}
            >
              Je choisis
            </button>
            <button
              type="button"
              className="button-glass"
              onClick={() => {
                window.localStorage.setItem('cookiesModal', true);
                window.localStorage.setItem('cookiesGoogle', true);
                setState({ ...state, cookiesChoice: true, cookiesGoogle: true });
                setCookiesModal(false);
              }}
            >
              Ok pour moi
            </button>
          </div>
        </>
      )}
    </div>
  );
}

Cookies.propTypes = {
  setCookiesModal: PropTypes.func.isRequired,
};
