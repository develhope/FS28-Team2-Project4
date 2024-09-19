import { useContext, useRef, useEffect, useState } from 'react';
import { Card } from './Card';
import { CardContext } from './CardProvider';

export const CardMenu = () => {
  const { isSelected, handleClick } = useContext(CardContext);
  const menuRef = useRef(null);
  const [showSubscriptionDetails, setShowSubscriptionDetails] = useState(false);

  const dataCard = [
    {
      titolo: 'Clienti',
      descrizione: "Visualizza l'elenco dei tuoi clienti",
      icona: 'customer',
    },
    {
      titolo: 'Schede',
      descrizione: 'Tutti i piani personalizzati dei tuoi clienti',
      icona: 'plans',
    },
    {
      titolo: 'Iscrizione',
      descrizione: 'Vedi lo stato del tuo abbonamento',
      icona: 'payment',
    },
    {
      titolo: 'Statistiche',
      descrizione: 'Visualizza i progressi dei tuoi clienti',
      icona: 'stats',
    },
    {
      titolo: 'Supporto',
      descrizione: 'Stai riscontrando un problema? Contattaci!',
      icona: 'support',
    },
    {
      titolo: 'Account',
      descrizione: 'Vedi le info sul tuo profilo',
      icona: 'myAccount',
    },
  ];

  useEffect(() => {
    if (menuRef.current && isSelected !== null) {
      const menu = menuRef.current;
      const selectedCard = menu.children[isSelected];
      const cardWidth = selectedCard.offsetWidth;
      const menuWidth = menu.offsetWidth;

      const scrollAmount =
        selectedCard.offsetLeft - menuWidth / 2 + cardWidth / 2;

      menu.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }

    // Gestione della visualizzazione dei dettagli dell'iscrizione
    setShowSubscriptionDetails(isSelected === 2);
  }, [isSelected]);

  return (
    <div>
      <div className="card-list overflow-x-auto w-dvw h-fit fixed lg:static border-t-2 lg:border-t-0 lg:border-b-2 border-secondary-green bottom-0 left-0 lg:top-0 shadow-[0_-4px_20px_#01181B] lg:shadow-[0_20px_20px_#01181B] bg-primary-blue">
        <div
          ref={menuRef}
          className="flex gap-8 items-center overflow-x-auto no-scrollbar snap-x h-44 md:h-64 lg:h-80 px-5"
        >
          {dataCard.map((data, idx) => (
            <Card
              key={idx}
              title={data.titolo}
              description={data.descrizione}
              icon={data.icona}
              status={isSelected === idx}
              onSelect={() => handleClick(idx)}
            />
          ))}
        </div>
      </div>

      {/* Mostra i dettagli dell'iscrizione quando la card "Iscrizione" è selezionata */}
      {showSubscriptionDetails && (
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
      )}
    </div>
  );
};
