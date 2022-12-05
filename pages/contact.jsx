import Image from 'next/image';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../src/styles/Contact.module.scss';
import Confirmation from '../src/components/modal/Confirmation';

export async function getStaticProps() {
  const res = await fetch('http://localhost:8000/api/pages/Contactez-nous');
  const pageContact = await res.json();
  return { props: { pageContact } };
}

export default function Contact({ pageContact }) {
  const [state, setState] = useState({
    form: {
      contactTo: 'assoc',
      name: '',
      email: '',
      message: '',
    },
    textArea: 1,
    confirmationName: null,
    confirmationEmail: null,
    confirmationMessage: null,
    toogleConfirmation: false,
    cookiesGoogle: null,
  });

  const descriptionMeta = pageContact.contents === null
    ? `Articles de blog ${pageContact.title}`
    : `${pageContact.contents.substring(0, 155).replace(/[\r\n]+/gm, '')}...`;

  useEffect(() => {
    const cookiesGoogleParam = window.localStorage.getItem('cookiesGoogle') === 'true';
    setState({ ...state, cookiesGoogle: cookiesGoogleParam });
  }, []);
  console.log(pageContact);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.form),
    };
    fetch('http://localhost:8000/api/contact', requestOptions)
      .catch(() => (
        setState({
          ...state,
        })
      ))
      .finally(() => {
        setState({
          ...state,
          toogleConfirmation: true,
          confirmationName: null,
          confirmationEmail: null,
          confirmationMessage: null,
          form: {
            contactTo: 'assoc',
            name: '',
            email: '',
            message: '',
          },
        });
      });
  };

  const handleChangeMessage = (e) => {
    const trows = e.target.value.split('\n').length - 1 === 0 ? 1 : e.target.value.split('\n').length - 1;
    setState({
      ...state,
      textArea: trows,
      form: {
        ...state.form, message: e.target.value, confirmationMessage: 'change',
      },
    });
    const textareaheight = state.textArea;
    console.log(textareaheight);
    if (e.target.value.length > 250) {
      setState({
        ...state,
        form: {
          ...state.form,
          confirmationMessage: 'confirmation',
          message: e.target.value,
          textArea: trows,
        },
      });
    } if (e.target.value.length > 250) {
      setState({
        ...state,
        form: {
          ...state.form,
          confirmationMessage: 'error',
          message: e.target.value,
          textArea: trows,

        },
      });
    }
  };

  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function classErrorOrConfirmation(message) {
    if (message === true) {
      return (<i className="icon-confirmation" />);
    } if (message === false) {
      return (<i className="icon-error" />);
    }
    return '';
  }

  function htmlMarkup(data) {
    return { __html: data };
  }

  return (
    <div>
      <Head>
        <title>{pageContact.subtitle}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageContact.subtitle} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content="https://kreatouteure.fr" />
        <meta property="og:image" content={pageContact.imgHeader.path} />
      </Head>

      {state.toogleConfirmation === 'false' ? (
        <>
          <div className="blur" />
          <Confirmation onClickConfirmation={onClickConfirmation} />
        </>
      ) : ''}
      <header>
        <Image
          src={pageContact.imgHeader.path}
          alt={pageContact.title}
          width={pageContact.imgHeader.width}
          height={pageContact.imgHeader.height}
          layout="intrinsic"
        />
        <h1>{pageContact.title}</h1>
        <p>{pageContact.contents}</p>
      </header>
      <main>
        <div className={styles.contact}>
          <div className={`card ${styles.contact__adress}`}>
            <h2>Kréa-Tout-Eure</h2>
            <h3>
              retrouver-nous sur :
            </h3>
            <div className={styles.contact__adress__social}>
              <a href="https://www.facebook.com/people/Kreatouteure/100064816565302/" target="blank" rel="noreferrer">
                <i className="icon-facebook" />
              </a>
              <a href="http://localhost" target="_blank" rel="noreferrer">
                <i className="icon-instagram" />
              </a>
            </div>
            <h3>
              <i className="icon-location" />
              Adresse du local :
            </h3>
            <address>
              12 rue du Docteur Chanoine , Vernon, France, 27200
            </address>
            {state.cookiesGoogle ? (
              <div
                className={styles.contact__adress__map}
                dangerouslySetInnerHTML={htmlMarkup(pageContact.contents2)}
              />
            ) : ''}
          </div>
          <div className={`card ${styles.contact__form}`}>
            <h2>Formulaire de contact</h2>
            <form onSubmit={handleSubmit}>
              <div className="input">
                <span>
                  Contactez Kréa Tout Eure ou le webmaster ?
                </span>
                <select
                  onChange={(e) => setState({
                    ...state,
                    form: { ...state.form, contactTo: e.target.value },
                  })}
                  value={state.form.contactTo}
                >
                  <option value="assoc">Kréa Tout Eure</option>
                  <option value="webmaster">Webmaster</option>
                </select>
              </div>
              <div className={styles.contact__form__input}>
                <span>
                  Votre Nom
                  {classErrorOrConfirmation(state.confirmationName)}
                </span>
                <input
                  type="text"
                  name="name"
                  value={state.form.name}
                  onChange={(e) => setState(
                    { ...state, form: { ...state.form, name: e.target.value } },
                  )}
                  onBlur={(e) => (e.target.value.length > 2 && e.target.value.length < 10
                    ? setState({ ...state, confirmationName: true })
                    : null)}
                  placeholder="Nom Prénom"
                  required
                />
              </div>
              <div className={styles.contact__form__input}>
                <span>
                  Votre email
                  {classErrorOrConfirmation(state.confirmationEmail)}
                </span>
                <input
                  type="email"
                  name="email"
                  value={state.form.email}
                  placeholder="exemple@email.fr"
                  required
                  onChange={(e) => setState(
                    { ...state, form: { ...state.form, email: e.target.value } },
                    (e.target.value.length > 2 && e.target.value.length < 35
                      ? setState({ ...state, confirmationEmail: true })
                      : setState({ ...state, confirmationEmail: false })),
                  )}
                  onBlur={(e) => (
                    regex.test(e.target.value)
                      ? setState({ ...state, confirmationEmail: true })
                      : setState({ ...state, confirmationEmail: false })
                  )}
                />
              </div>
              <div className={styles.contact__form__textarea}>
                <span>
                  Message
                  {classErrorOrConfirmation(state.confirmationMessage)}
                </span>
                <textarea
                  rows={state.textArea}
                  value={state.form.message}
                  onChange={handleChangeMessage}
                  onBlur={(e) => (e.target.value.length > 2 && e.target.value.length < 250
                    ? setState({ ...state, confirmationMessage: true })
                    : null)}
                  name="message"
                  wrap="off"
                  placeholder="Votre message"
                  required
                />
              </div>
              <button type="submit" className="button-submit">
                Envoyer
                <i className="icon-paper-plane" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
