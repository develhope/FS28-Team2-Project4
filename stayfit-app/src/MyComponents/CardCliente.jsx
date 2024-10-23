import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NewIcon } from './NewIcon';
import Button from './Button';

export function CardCliente({
  nome,
  cognome,
  eta: birthDate,
  obiettivo,
  stileDiVita,
  foto,
  onExpand,
  id: clientId
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (onExpand) onExpand();
  };

  useEffect(() => {
    if (isExpanded) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [isExpanded]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div
      className={`min-w-[380px] flow-root rounded-2xl border-x-4 border-y-4 border-secondary-green py-4 shadow-[4px_4px_8px_#01181B,-4px_-4px_8px_#01282F] cursor-pointer ${
        isExpanded ? 'bg-[#001E23]' : ''
      } max-w-md mx-auto`}
    >
      {/* Foto del Cliente */}
      <div className="flex justify-center mb-4">
        <img
          className="w-24 h-24 border-4 border-[#868686] shadow-md rounded-full"
          src={foto || '/src/assets/img/avatar.webp'}
          alt={`Foto di ${nome} ${cognome}`}
        />
      </div>

      {/* Informazioni di Base del Cliente */}
      <dl className="divide-y divide-[#868686] text-sm text-center">
        <div className="grid grid-cols-1 gap-1 p-4 bg-secondary-green">
          <dt className="font-extrabold text-xl text-activated-card">{nome}</dt>
        </div>
        <div className="grid grid-cols-1 gap-1 p-4 bg-[#001E23]">
          <dt className="font-extrabold text-xl text-white">{cognome}</dt>
        </div>
      </dl>

      {/* Sezione espandibile con transizione */}
      <div
        ref={contentRef}
        style={{
          maxHeight,
          transition: 'max-height 0.5s ease, opacity 0.5s ease',
        }}
        className={`overflow-hidden opacity-${isExpanded ? '100' : '0'}`}
      >
        <dl className="divide-y divide-[#868686] text-sm text-center">
          <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] bg-secondary-green">
            <dt className="font-extrabold text-xl text-[#001E23]">
              Data di nascita
            </dt>
            <dd className="font-extrabold text-[#001E23]">
              {formatDate(birthDate)}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-4 bg-[#001E23]">
            <dt className="font-extrabold text-xl text-white">Obiettivo</dt>
            <dd className="text-[#001E23]">{obiettivo}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] bg-secondary-green">
            <dt className="font-extrabold text-xl text-[#001E23]">
              Stile di vita
            </dt>
            <dd className="text-white">{stileDiVita}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] bg-[#001E23]">
            <dt className="font-extrabold text-xl text-white">Peso</dt>
            <dd className="text-white">N/A (Modificabile)</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-4 bg-secondary-green">
            <dt className="font-extrabold text-xl text-[#001E23]">
              Massa Grassa
            </dt>
            <dd className="text-[#001E23]">N/A (Da inserire)</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] bg-[#001E23]">
            <dt className="font-extrabold text-xl text-white">Massa Magra</dt>
            <dd className="text-white">N/A (Da inserire)</dd>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center p-4 even:bg-[#94B7BD] bg-[#001E23]">
          <Link to={`/alimentazione/${clientId}`}>
            <Button
              type="button"
              text={'Vai alla dieta'}
              color="#C1FF72"
              txtcolor="#001E23"
            />
            </Link><Link to="/esercizio">
            <Button
              type="button"
              text={'Vai alla scheda'}
              color="#C1FF72"
              txtcolor="#001E23"
            />
            </Link>
          </div>
        </dl>
      </div>

      {/* Icona per Espandere/Ridurre */}
      <div className="flex justify-center mt-2" onClick={toggleExpand}>
        <NewIcon
          type={isExpanded ? 'collapse' : 'expand'}
          className="text-secondary-green w-6 h-6"
        />
      </div>
    </div>
  );
}
