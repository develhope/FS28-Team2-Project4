import React from 'react';
import { Card } from './Card';

export const CardMenu = () => {
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
      titolo: 'La tua iscrizione',
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
      titolo: 'Il tuo account',
      descrizione: 'Vedi le info sul tuo profilo',
      icona: 'myAccount',
    },
  ];

  return (
    <div className="card-list overflow-x-hidden">
      <div className="flex gap-4 items-center overflow-x-auto no-scrollbar snap-x h-80 px-5">
        {dataCard.map((data, index) => (
          <Card
            key={index}
            title={data.titolo}
            description={data.descrizione}
            icon={data.icona}
          />
        ))}
      </div>
    </div>
  );
};
