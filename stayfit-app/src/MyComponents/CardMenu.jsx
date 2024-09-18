import React, { useContext } from 'react';
import { Card } from './Card';
import { CardContext } from './CardProvider';

export const CardMenu = () => {
  const { isSelected, handleClick } = useContext(CardContext);

  const dataCard = [
    {
      titolo: 'Clienti',
      descrizione: `Visualizza l'elenco dei tuoi clienti`,
      icona: 'customer',
    },
    {
      titolo: 'I tuoi piani',
      descrizione: 'Esplora e modifica i piani personalizzati dei tuoi clienti',
      icona: 'plans',
    },
    {
      titolo: 'Iscrizione',
      descrizione: 'Vedi lo stato del tuo abbonamento',
      icona: 'payment',
    },
    {
      titolo: 'Supporto',
      descrizione: 'Stai riscontrando un problema? Contattaci!',
      icona: 'support',
    },
    {
      titolo: 'Statistiche',
      descrizione: 'Visualizza i progressi dei tuoi clienti',
      icona: 'stats',
    },
    {
      titolo: 'Account',
      descrizione: 'Vedi le info sul tuo profilo',
      icona: 'myAccount',
    },
  ];

  return (
    <div className="card-list overflow-x-hidden">
      <div className="flex gap-4 items-center overflow-x-auto no-scrollbar snap-x h-80 px-5">
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
  );
};
