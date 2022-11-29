import Image from 'next/image';
import { useEffect, useState } from 'react';

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
      })
  };

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
      <main>

        <form onSubmit={handleSubmit}>
          <div className="input">
            Nom
            <input
              type="text"
              name="name"
              value={state.form.name}
              onChange={(e) => setState({ ...state, form: { ...state.form, name: e.target.value } })}
              required
            />
          </div>
          <div className="input">
            Email
            <input
              type="email"
              name="email"
              value={state.form.email}
              onChange={(e) => setState({ ...state, form: { ...state.form, email: e.target.value } })}
              required
            />
          </div>
          <div className="input">
            <select
              onChange={(e) => setState({
                ...state,
                form: { ...state.form, contactTo: e.target.value },
              })}
            >
              <option value="assoc">Kréa Tout Eure</option>
              <option value="webmaster">Webmaster</option>
            </select>
          </div>
          <div className="textarea">
            Message
            <textarea
              value={state.form.message}
              onChange={(e) => setState({
                ...state,
                form: { ...state.form, message: e.target.value },
              })}
              name="message"
              required
            />
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </main>
    </div>
  );
}
