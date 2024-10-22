import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Textbox from './Textbox';
import Button from './Button';
// import users from '../../database/dbProfessionista.json';

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        if (data.token) {
          const user = data.user;
        let formattedBirthUser = user;
        if (user.birth_date) {
          const isoDateString = user.birth_date;
          const date = new Date(isoDateString);
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const formattedDate = date.toLocaleDateString('it-IT', options);
          formattedBirthUser = { ...user, birth_date: formattedDate };
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', formattedBirthUser.id);
        localStorage.setItem('user', JSON.stringify(formattedBirthUser));
        setErrorMessage('');
        navigate('/dashboard');
        } else {
          setErrorMessage('ID utente non trovato');
        }
      } else {
        setErrorMessage('Email o password non corretti');
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
      setErrorMessage('Si è verificato un errore durante il login');
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
