import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export const Iscrizione = () => {
  return (
    <div className="bg-activated-card text-white text-left p-6 rounded-lg shadow-md mt-6 dropdown">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Sezione Informazioni di fatturazione */}
        <div className="bg-activated-card p-6 rounded-lg">
          <h4 className="font-bold mb-4">Informazioni di fatturazione:</h4>
          <p className='py-2'>Metodo di pagamento:</p>
          <p className='py-2'>Mastercard 5555 4444 3333 2222</p>
          <p>Scadenza: 08/24</p>
          <a href="#" className="text-green-400 mt-2 block p-2 underline" aria-label="Aggiungi un metodo di pagamento">
            + Aggiungi un metodo di pagamento
          </a>
          <h4 className='font-bold p-2'>Esenzione fiscale:</h4>
          <p>Per ricevere le fatture per esenzione fiscale, inserisci il tuo codice fiscale o la tua P. IVA</p>
          <input
            type="text"
            className="bg-light-blue-shadow p-2 w-full mt-2 rounded-md border-white"
            placeholder="Cod. Fiscale/P. IVA"
            aria-label="Cod. Fiscale/P. IVA"
          />
        </div>

        {/* Dettagli dell'abbonamento */}
        <div className="bg-activated-card p-6 rounded-lg">
          <h4 className="font-bold mb-4">I dettagli del tuo abbonamento:</h4>
          <p className='py-3'>Hai sottoscritto il nostro piano: Annuale</p>
          <p>Nome: Mario</p>
          <p>Cognome: Rossi</p>
          <p className='py-3'>Professione: Nutrizionista</p>
          <p>Scadenza: 12/24</p>
          <a href="#" className="text-green-400 mt-2 block py-3 underline" aria-label="Rinnova in anticipo">
            Rinnova in anticipo
          </a>
          <a href="#" className="text-red-400 mt-2 block py-3 underline" aria-label="Annulla la tua iscrizione">
            Annulla la tua iscrizione
          </a>
        </div>

        {/* Informazioni di fatturazione aggiuntive */}
        <div className="bg-activated-card p-6 rounded-lg">
          <h4 className="font-bold mb-4">Informazioni di fatturazione aggiuntive:</h4>
          <input
            type="text"
            className="bg-light-blue-shadow p-2 w-full mt-2 rounded-md"
            placeholder="Nome azienda"
            aria-label="Nome azienda"
          />
          <textarea
            className="bg-light-blue-shadow p-2 w-full mt-2 rounded-md p-5"
            placeholder="Indirizzo di fatturazione"
            aria-label="Indirizzo di fatturazione"
          ></textarea>
          <p className='py-3'>Tutte le e-mail relative alla fatturazione verranno
          inviate al tuo indirizzo e-mail e a questi contatti di
          fatturazione</p>
          <input
            type="email"
            className="bg-light-blue-shadow p-2 w-full mt-2 rounded-md"
            placeholder="Indirizzo e-mail"
            aria-label="Indirizzo e-mail"
          />
          <a href="#" className="text-green-400 mt-2 block underline" aria-label="Aggiungi un nuovo contatto">
            + Aggiungi un nuovo contatto
          </a>
        </div>
      </div>
    </div>
  );
};


