export function CardCliente() {
    return (
        <div className="flow-root rounded-2xl border-x-4 border-y-4 border-secondary-green py-4 shadow-[4px_4px_8px_#01181B,-4px_-4px_8px_#01282F]">
            {/* Foto del Cliente */}
            <div className="flex justify-center mb-4">
                <img
                    className="w-24 h-24 border-4 border-[#868686] shadow-md"
                    src="/src/assets/img/avatar.webp"
                    alt="Foto del cliente"
                />
            </div>

            {/* Informazioni del Cliente */}
            <dl className="divide-y divide-[#868686] text-sm">
                <div className="grid grid-cols-1 gap-1 p-4 bg-[#001E23] sm:grid-cols-3 sm:gap-4">
                    <dt className="font-extrabold text-xl text-white">Nome</dt>
                    <dd className="text-white sm:col-span-2">Mario</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-4 even:bg-secondary-green sm:grid-cols-3 sm:gap-4">
                    <dt className="font-extrabold text-xl text-[#001E23]">Cognome</dt>
                    <dd className="text-[#001E23] sm:col-span-2">Rossi</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] sm:grid-cols-3 sm:gap-4">
                    <dt className="font-extrabold text-xl text-white">Età</dt>
                    <dd className="text-white sm:col-span-2">25</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-4 bg-secondary-green sm:grid-cols-3 sm:gap-4">
                    <dt className="font-extrabold text-xl text-[#001E23]">Obiettivo</dt>
                    <dd className="text-[#001E23] sm:col-span-2">Perdita di peso</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-4 even:bg-[#94B7BD] sm:grid-cols-3 sm:gap-4">
                    <dt className="font-extrabold text-xl text-white">Stile di vita</dt>
                    <dd className="text-white sm:col-span-2">Mario conduce uno stile di vita sedentario, trascorrendo molte ore davanti allo schermo e facendo poca attività fisica. Ha una dieta ricca di cibi processati e snack, ma è motivato a fare cambiamenti positivi per raggiungere i suoi obiettivi di perdita di peso e migliorare la sua salute generale.
                    </dd>
                </div>
            </dl>
        </div>
    );
}
