import { useState } from 'react';

const SquareButton = ({ label, icon }) => (
  <div className="bg-teal-800 p-6 rounded-lg text-white flex flex-col items-center justify-center cursor-pointer w-32 h-32">
    <div className="text-lime-400 mb-2">
      {icon}
    </div>
    <span className="text-sm font-semibold">{label}</span>
  </div>
);

const Dashboards = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-teal-950 p-10">
      <div className="flex justify-between items-center gap-4">
        <SquareButton
          label="Clienti"
          icon={
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zm4-3a3 3 0 106 0 3 3 0 00-6 0zM8 10a4 4 0 00-4 4v2h12v-2a4 4 0 00-4-4H8zM2 14a4 4 0 014-4h2a4 4 0 014 4v2H2v-2z" />
            </svg>
          }
        />
        <SquareButton
          label="I tuoi piani"
          icon={
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3 11a1 1 0 01-1 1H8a1 1 0 010-2h4a1 1 0 011 1zm0-4a1 1 0 01-1 1H8a1 1 0 010-2h4a1 1 0 011 1zM7 7h6a1 1 0 110 2H7a1 1 0 110-2z" />
            </svg>
          }
        />
        <SquareButton
          label="Statistiche"
          icon={
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 11a1 1 0 011-1h1v9a1 1 0 11-2 0v-8zm5-5a1 1 0 011-1h1v14a1 1 0 11-2 0V6zm5 8a1 1 0 011-1h1v6a1 1 0 11-2 0v-5zm5-10a1 1 0 011-1h1v16a1 1 0 11-2 0V4z" />
            </svg>
          }
        />
        <SquareButton
          label="La tua iscrizione"
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
          onClick={toggleDetails}
        />
        <SquareButton
          label="Supporto"
          icon={
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927C9.562 1.617 11.056 1 12.5 1c2.485 0 4.5 2.015 4.5 4.5S14.985 10 12.5 10h-1a1 1 0 00-1 1v4H9a1 1 0 110-2h1V7a1 1 0 011-1h2a2.5 2.5 0 10-2.551-4.073l-.8-.707A4.5 4.5 0 0112.5 0C15.538 0 18 2.462 18 5.5S15.538 11 12.5 11h-1a2.5 2.5 0 00-2.5 2.5v4a1 1 0 01-2 0v-4a2.5 2.5 0 00-2.5-2.5h-1A1.5 1.5 0 012 10v-1a1.5 1.5 0 011.5-1.5h1A4.5 4.5 0 019.049 2.927z" />
            </svg>
          }
        />
        <SquareButton
          label="Il tuo profilo"
          icon={
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM3 18a7 7 0 1114 0H3z" />
            </svg>
          }
        />
      </div>

      {isOpen && (
        <div className="mt-6">
          <BillingInfo />
          <SubscriptionDetails />
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

export default Dashboards;


   
