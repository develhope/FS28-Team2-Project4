import { useState } from 'react';

const SquareButton = ({ icon }) => (
  <div className="p-6 rounded-lg text-white flex flex-col items-center justify-center cursor-pointer w-32 h-32">
    <div className="text-lime-400 mb-2">
      {icon}
    </div>
    </div>
);

const SubscriptionCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-4 rounded-lg text-white cursor-pointer">
      <div
        onClick={toggleDetails}
        className="p-3 text-white rounded-lg shadow-md cursor-pointer"
      >
        <h2 className="text-4xl font-bold mb-4">La tua iscrizione</h2>
        <p>Vedi lo stato del tuo abbonamento</p>
        <SquareButton
          icon={
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-11.5a1 1 0 00-1.493-.864l-4.225 2.4a1 1 0 00-.232 1.64l3.5 3a1 1 0 001.493-.864v-5.312z" />
            </svg>
          }
        />
      </div>

      {isOpen && (
        <div className="mt-6">
          <BillingInfo />
          <SubscriptionDetails />
          <BillingForm />
        </div>
      )}
    </div>
  );
};

const BillingInfo = () => (
  <div className="bg-teal-900 p-6 rounded-lg text-white mt-4">
    <h3 className="text-lg font-semibold">Informazioni di fatturazione:</h3>
    <p>Metodo di pagamento:</p>
    <p>Mastercard 5555 4444 3333 2222</p>
    <p>Scadenza: 08/24</p>
    <a href="#" className="text-lime-400 underline mt-2 inline-block">+ Aggiungi un metodo di pagamento</a>
    <div className="mt-4">
      <h4 className="font-semibold">Esenzione fiscale:</h4>
      <p>Per ricevere le fatture con esenzione fiscale, inserisci il tuo codice fiscale o la tua P. IVA</p>
      <input type="text" className="w-full mt-2 p-2 rounded bg-teal-800 text-white" placeholder="Cod. Fiscale/P. IVA" />
    </div>
  </div>
);

const SubscriptionDetails = () => (
  <div className="bg-teal-900 p-6 rounded-lg text-white mt-4">
    <h3 className="text-lg font-semibold">I dettagli del tuo abbonamento:</h3>
    <p>Hai sottoscritto il nostro piano: Annuale</p>
    <p>Nome: Mario</p>
    <p>Cognome: Rossi</p>
    <p>Professione: Nutrizionista</p>
    <p>Scadenza: 12/24</p>
    <a href="#" className="text-lime-400 underline block mt-2">Rinnova in anticipo</a>
    <a href="#" className="text-red-500 underline block mt-2">Annulla la tua iscrizione</a>
  </div>
);

const BillingForm = () => (
  <div className="bg-teal-900 p-6 rounded-lg text-white mt-4">
    <h3 className="text-lg font-semibold">Informazioni di fatturazione:</h3>
    <input type="text" className="w-full mt-2 p-2 rounded bg-teal-800 text-white" placeholder="Nome azienda" />
    <textarea className="w-full mt-4 p-2 rounded bg-teal-800 text-white" placeholder="Indirizzo di fatturazione"></textarea>
    <input type="email" className="w-full mt-4 p-2 rounded bg-teal-800 text-white" placeholder="Indirizzo e-mail" />
    <a href="#" className="text-lime-400 underline mt-2 inline-block">+ Aggiungi un nuovo contatto</a>
  </div>
);

const Iscrizione = () => {
  return (
    <div className="p-3 bg-teal-800  text-white rounded-lg shadow-md cursor-pointer">
      <div>
        <SubscriptionCard />
      </div>
    </div>
  );
};

export default Iscrizione;
