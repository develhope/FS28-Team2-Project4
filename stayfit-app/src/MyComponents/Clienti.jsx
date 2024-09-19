import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export const Clienti = () => {
  const [showLink, setShowLink] = useState(false);

  const handleClick = () => {
    setShowLink(true);
  };

  return (
    <div className="card-details flex flex-col justify-center items-center w-full h-full p-4 mt-4">
      <Button
        type="button"
        onClick={handleClick}
        text={'Aggiungi Cliente +'}
        color="#C1FF72"
        txtcolor="#001E23"
      />
      {showLink && (
        <>
          <Link to="/form-cliente" className="mt-4 text-blue-500 underline">
            http://stayfit.com/random-link-registrati-dai/
          </Link>
          <p>oppure</p>
          <Link to="/form-cliente" className="mt-4 text-blue-500 underline">
            Vai direttamente al form
          </Link>
        </>
      )}
    </div>
  );
};
