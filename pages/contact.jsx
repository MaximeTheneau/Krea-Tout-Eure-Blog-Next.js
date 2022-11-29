import { useState } from 'react';

export default function Contact() {
  const [state, setState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.form),
    };
    fetch('http://localhost:8000/api/message', requestOptions)
      .finally(() => {
        setState({
          ...state,
          form: {
            name: '',
            email: '',
            subject: '',
            message: '',
          },
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          Nom
          <input
            type="text"
            name="name"
            value={state.form.name}
            required
          />
        </div>
        <div className="input">
          Email
          <input
            type="email"
            required
          />
        </div>
        <div className="input">
          <select>
            <option value="assoc">Kréa Tout Eure</option>
            <option value="Webmaster">Webmaster</option>
          </select>
        </div>
        <div className="textarea">
          Message
          <textarea
            name="message"
            required
          />
        </div>
      </form>
    </div>
  );
}
