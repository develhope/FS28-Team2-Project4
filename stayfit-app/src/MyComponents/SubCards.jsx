import React, { useContext } from 'react';
import { Card } from './Card';
import { CardContext } from './CardProvider';

export const SubCards = ({ onSubscriptionChange }) => {
  const { isSelected, handleClick } = useContext(CardContext);

  const subPlans = [
    {
      id: 101,
      titolo: 'Free',
      descrizione:
        'Questo piano ti permette di provare una generazione al mese',
      icona: 'starter',
    },
    {
      id: 102,
      titolo: 'Starter',
      descrizione:
        'Qui potrai accedere a tutte le funzioni premium, a scelta fra NutriPlan e FitPlan',
      icona: 'premium',
    },
    {
      id: 103,
      titolo: 'Premium',
      descrizione:
        'Ottieni il pieno accesso a tutte le funzioni per entrambe le professioni disponibili',
      icona: 'advanced',
    },
  ];

  const handleCardClick = (plan) => {
    handleClick(plan.id); // Seleziona la card
    onSubscriptionChange(plan.value); // Aggiorna il form con il valore dell'abbonamento selezionato
  };

  return (
    <div className="flex flex-row gap-5">
      {subPlans.map((plan) => {
        return (
          <Card
            key={plan.id}
            title={plan.titolo}
            description={plan.descrizione}
            icon={plan.icona}
            status={isSelected === plan.id}
            onSelect={() => handleCardClick(plan.id)}
          />
        );
      })}
    </div>
  );
};
