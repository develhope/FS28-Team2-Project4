import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Textbox from './Textbox';
import Button from './Button';
import users from '../../database/dbProfessionista.json';

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setErrorMessage('');
      navigate('/dashboard');
    } else {
      setErrorMessage('Email o password non corretti');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-fit h-fit px-9 py-9 bg-primary-blue border-2 border-secondary-green rounded-lg">
      <h1 className="text-4xl font-extrabold text-white">Accedi</h1>
      <p className="text-sm text-gray-400 mt-3">
        Accedi utilizzando la tua email.
      </p>
      <form
        className={'flex flex-col gap-5 justify-center items-center my-8'}
        onSubmit={handleLogin}
      >
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
        {errorMessage && <p className="text-red-700 text-sm">{errorMessage}</p>}
        <Button type="submit" text="Login" color="#C1FF72" txtcolor="#001E23" />
      </form>
      <button className={'text-white mt-1 underline'} onClick={onClose}>
        Chiudi
      </button>
    </div>
  );
};

export default LoginForm;
