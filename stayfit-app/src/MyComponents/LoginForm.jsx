import { useState } from 'react';
import Textbox from './Textbox';
import Button from './Button';
import users from '../../database/dbProfessionista.json';

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      alert('Login avvenuto con successo!');
      setErrorMessage('');
    } else {
      setErrorMessage('Email o password non corretti');
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className='w-auto h-auto px-4 py-7 bg-primary-blue'>
        <form onSubmit={handleLogin} className="space-y-4">
          <Textbox
            label="Email"
            type="email"
            id="email"
            hasError={errorMessage}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Textbox
            label="Password"
            type="password"
            id="password"
            hasError={errorMessage}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <p className="text-red-700 text-sm">{errorMessage}</p>
          )}
          <Button
            type="submit"
            text="Login"
            color="#C1FF72"
            txtcolor="#001E23"
          />
        </form>
        <button onClick={onClose}>Chiudi</button>
      </div>
    </div>
  );
};

export default LoginForm;
