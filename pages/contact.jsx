import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../src/styles/Contact.module.scss';

export async function getStaticProps() {
  const res = await fetch('http://localhost:8000/api/pages/Contact');
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
    textArea: 3,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.form),
    };
    fetch('http://localhost:8000/api/contact', requestOptions)
      .catch((err) => console.log(err))
      .finally(() => {
        setState({
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

  function createMarkup(data) {
    return { __html: data };
  }
  return (
    <div>
      <header>
        <Image
          src={pageContact.imgHeader.path}
          alt={pageContact.title}
          width={pageContact.imgHeader.width}
          height={pageContact.imgHeader.height}
        />
        <h1>{pageContact.title}</h1>
      </header>
      <main className={styles.contact}>
        <div className={styles.contact__adress}>
          <div
            className={styles.contact__adress__content}
            dangerouslySetInnerHTML={createMarkup(pageContact.contents)}
          />
          <div
            className={styles.contact__adress__map}
            dangerouslySetInnerHTML={createMarkup(pageContact.contents2)}
          />
        </div>

        <form onSubmit={handleSubmit} className={styles.contact__form}>
          <div className="input">
            Contactez Kréa Tout Eure ou le webmaster ?
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
          <div className="input">
            Nom
            <input
              type="text"
              name="name"
              value={state.form.name}
              onChange={(e) => setState(
                { ...state, form: { ...state.form, name: e.target.value } },
              )}
              placeholder="Nom Prénom"
              required
            />
          </div>
          <div className="input">
            Email
            <input
              type="email"
              name="email"
              value={state.form.email}
              onChange={(e) => setState(
                { ...state, form: { ...state.form, email: e.target.value } },
              )}
              placeholder="exemple@email.fr"
              required
            />
          </div>
          <div className="textarea">
            Message
            <textarea
              rows={state.textArea}
              value={state.form.message}
              onChange={handleChangeMessage}
              name="message"
              wrap="off"
              placeholder="Votre message"
              required
            />
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </main>
    </div>
  );
}
