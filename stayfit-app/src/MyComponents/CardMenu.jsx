import { useContext, useRef, useEffect } from 'react';
import { Card } from './Card';
import { CardContext } from './CardProvider';

export const CardMenu = () => {
  const { isSelected, handleClick } = useContext(CardContext);
  const menuRef = useRef(null);

  const dataCard = [
    {
      titolo: 'Clienti',
      descrizione: `Visualizza l'elenco dei tuoi clienti`,
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
  }, [isSelected]);

  return (
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
  );
};
