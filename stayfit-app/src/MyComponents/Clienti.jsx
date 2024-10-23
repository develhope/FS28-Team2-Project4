import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { CardCliente } from './CardCliente';

export const Clienti = () => {
  const [showLink, setShowLink] = useState(false);
  const [clienti, setClienti] = useState([]);

  const handleClick = () => {
    setShowLink(true);
  };

  const fetchClienti = async () => {
    try {
      const response = await fetch(`http://localhost:3000/clients?professional_id=${localStorage.getItem('userId')}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setClienti(data);
    } catch (error) {
      console.error('Errore nel recupero dei clienti:', error);
    }
  };

  useEffect(() => {
    fetchClienti();
  }, []);

  return (
    <div className="card-details flex flex-col justify-center items-center w-full h-full p-4">
      <Button
        type="button"
        onClick={handleClick}
        text={'Aggiungi Cliente +'}
        color="#C1FF72"
        txtcolor="#001E23"
      />
      {showLink && (
        <>
          <Link to="/form-cliente" className="mt-6 text-white underline">
            http://stayfit.com/random-link-registrati-dai/
          </Link>
          <p className='text-white mt-4'>oppure</p>
          <Link to="/form-cliente" className="mt-4 text-white underline">
            Vai direttamente al form
          </Link>
        </>
      )}

      {/* Mostra le schede dei clienti */}
      <div className="flex flex-wrap justify-start gap-6 mt-6 w-full">
        {clienti.length > 0 ? (
          clienti.map((cliente) => (
            <CardCliente
              key={cliente.id}
              nome={cliente.first_name}
              cognome={cliente.last_name}
              eta={cliente.birth_date}
              obiettivo={cliente.obiettivo}
              stileDiVita={cliente.stileDiVita}
              foto={cliente.foto}
              id={cliente.id}
            />
          ))
        ) : (
          <p className="text-white">Nessun cliente trovato.</p>
        )}
      </div>
    </div>
  );
};
