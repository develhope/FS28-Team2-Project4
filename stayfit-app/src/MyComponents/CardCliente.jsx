import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export function CardCliente({
  nome,
  cognome,
  eta: birthDate,
  obiettivo,
  stileDiVita,
  foto,
  onExpand,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (onExpand) onExpand();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div
      className={`h-fit min-w-[380px] rounded-2xl border-x-4 border-y-4 border-secondary-green py-4 shadow-[4px_4px_8px_#01181B,-4px_-4px_8px_#01282F] cursor-pointer ${isExpanded ? 'bg-[#001E23] w-[100vw] order-first' : ''
        } mx-auto`}
      onClick={toggleExpand}
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
      <div className={`text-sm text-center ${isExpanded ? 'grid grid-cols-2 gap-4 p-4 bg-secondary-green text-sm text-center border-t border-gray-200' : 'divide-y divide-[#868686]'
        }`}>
        <div className={`grid grid-cols-1 gap-1 p-4 bg-secondary-green ${isExpanded ? 'justify-items-end' : ''}`}>
          <dt className="font-extrabold text-xl text-activated-card">{nome}</dt>
        </div>
        <div className={`grid grid-cols-1 gap-1 p-4 ${isExpanded ? ' bg-secondary-green justify-items-start' : 'bg-[#001E23]'}`}>
          <dt className={`font-extrabold text-xl ${isExpanded ? 'text-activated-card' : ' text-white'}`}>{cognome}</dt>
        </div>
      </div>

      {/* Sezione espandibile con transizione */}
      <div
        ref={contentRef}
        style={{
          transition: 'max-height 0.5s ease, opacity 0.5s ease',
        }}
        className={`overflow-hidden ${isExpanded ? 'opacity-100 h-full block' : 'opacity-0 h-fit hidden'}`}
      >
        <div className={` text-sm text-center ${isExpanded ? 'grid grid-cols-2 text-sm text-center border-t border-gray-200 lg:grid-cols-3' : ''}`}>
          <div className="grid grid-cols-1 gap-1 p-4  bg-[#001E23]">
            <dt className="font-extrabold text-xl text-white">Data di nascita</dt>
            <dd className="font-extrabold text-white">{formatDate(birthDate)}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-4 'bg-[#001E23]">
            <dt className="font-extrabold text-xl text-white">Obiettivo</dt>
            <dd className="text-[#001E23]">{obiettivo}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] bg-secondary-green lg:bg-[#001E23]">
            <dt className="font-extrabold text-xl text-[#001E23] lg:text-white">Stile di vita</dt>
            <dd className="text-[#001E23] lg:text-white">{stileDiVita}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] bg-secondary-green">
            <dt className="font-extrabold text-xl text-[#001E23]">Peso</dt>
            <dd className="text-[#001E23]">N/A (Modificabile)</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] bg-[#001E23] lg:bg-secondary-green">
            <dt className="font-extrabold text-xl text-white lg:text-[#001E23]">Massa Grassa</dt>
            <dd className="text-white lg:text-[#001E23]">N/A (Da inserire)</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] bg-[#001E23] lg:bg-secondary-green">
            <dt className="font-extrabold text-xl text-white lg:text-[#001E23]">Massa Magra</dt>
            <dd className="text-white lg:text-[#001E23]">N/A (Da inserire)</dd>
          </div>
        </div>
        <div className="flex flex-cols-2 gap-4 p-4 justify-center even:bg-[#94B7BD] bg-[#001E23]">
          <Link to="/alimentazione">
            <Button
              type="button"
              text={'Vai alla dieta'}
              color="#C1FF72"
              txtcolor="#001E23"
            />
          </Link>
          <Link to="/esercizio">
            <Button
              type="button"
              text={'Vai alla scheda'}
              color="#C1FF72"
              txtcolor="#001E23"
            />
          </Link>
        </div>
      </div>

      {/* Icona per Espandere/Ridurre
      <div className="flex justify-center mt-2">
        <NewIcon
          type={isExpanded ? 'collapse' : 'expand'}
          className="text-secondary-green w-6 h-6"
        /> 
      </div>*/}
    </div>
  );
}
