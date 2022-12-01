import { useState } from 'react';
import style from '../../styles/Modal.module.scss';

export default function Cookies({ setCookiesModal }) {
  const [state, setState] = useState({
    cookiesChoice: false,
    cookiesGoogle: false,
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
        <div className={style.cookies__choice}>
          <h2>Les cookies</h2>
          <p>
            Les cookies sont Utilisé pour mesurer notre audience et améliorer nos contenus.
          </p>
          <table>
            <thead>
              <tr>
                <th>Tout cocher</th>
                <th>
                  {googleChoice()}
                </th>
              </tr>
              <tr>
                <th scope="col">Google Maps et Google Analytics</th>
                <th scope="col">
                  {googleChoice()}
                </th>
              </tr>
            </thead>
          </table>
        </div>
      ) : ''}
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
          onClick={() => setState({ ...state, cookiesChoice: true })}
        >
          Je choisis
        </button>
        <button
          type="button"
          className="button-glass"
          onClick={() => {
            window.localStorage.setItem('cookies', 'false');
            setCookiesModal(false);
          }}
        >
          Ok pour moi
        </button>
      </div>
    </div>
  );
}
