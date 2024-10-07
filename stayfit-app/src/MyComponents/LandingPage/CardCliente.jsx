import { useState } from 'react';
import { NewIcon } from '../NewIcon';

export function CardCliente({ nome, cognome, eta, obiettivo, stileDiVita, foto, onExpand }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        if (onExpand) onExpand();
    };

    return (
        <div
            className={`flow-root rounded-2xl border-x-4 border-y-4 border-secondary-green py-4 shadow-[4px_4px_8px_#01181B,-4px_-4px_8px_#01282F] cursor-pointer ${isExpanded ? 'bg-[#001E23]' : ''} max-w-md mx-auto`}
            onClick={toggleExpand}
        >
            {/* Foto del Cliente */}
            <div className="flex justify-center mb-4">
                <img
                    className="w-24 h-24 border-4 border-[#868686] shadow-md rounded-full"
                    src={foto || "/src/assets/img/avatar.webp"}
                    alt={`Foto di ${nome} ${cognome}`}
                />
            </div>

            {/* Informazioni di Base del Cliente */}
            <dl className="divide-y divide-[#868686] text-sm text-center">
                <div className="grid grid-cols-1 gap-1 p-4 bg-secondary-green">
                    <dt className="font-extrabold text-xl text-activated-card">Nome</dt>
                    <dd className="text-white">{nome}</dd>
                </div>
                <div className="grid grid-cols-1 gap-1 p-4 bg-activated-card">
                    <dt className="font-extrabold text-xl text-white">Cognome</dt>
                    <dd className="text-[#001E23]">{cognome}</dd>
                </div>

                {isExpanded && (
                    <>
                        <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] bg-secondary-green">
                            <dt className="font-extrabold text-xl text-[#001E23]">Età</dt>
                            <dd className="text-white">{eta}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-4 bg-[#001E23]">
                            <dt className="font-extrabold text-xl text-white">Obiettivo</dt>
                            <dd className="text-[#001E23]">{obiettivo}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] bg-secondary-green">
                            <dt className="font-extrabold text-xl text-[#001E23]">Stile di vita</dt>
                            <dd className="text-white">{stileDiVita}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] bg-[#001E23]">
                            <dt className="font-extrabold text-xl text-white">Peso</dt>
                            <dd className="text-white">N/A (Modificabile)</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-4 bg-secondary-green">
                            <dt className="font-extrabold text-xl text-[#001E23]">Massa Grassa</dt>
                            <dd className="text-[#001E23]">N/A (Da inserire)</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] bg-[#001E23]">
                            <dt className="font-extrabold text-xl text-white">Massa Magra</dt>
                            <dd className="text-white">N/A (Da inserire)</dd>
                        </div>
                    </>
                )}
            </dl>

            {/* Icona per Espandere/Ridurre */}
            <div className="flex justify-center mt-2">
                <NewIcon
                    type={isExpanded ? 'collapse' : 'expand'}
                    className="text-secondary-green w-6 h-6"
                />
            </div>
        </div>
    );
}
