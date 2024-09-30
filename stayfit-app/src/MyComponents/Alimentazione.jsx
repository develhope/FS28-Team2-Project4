import { useState } from "react";

const Alimentazione = () => {
    // Rimuoviamo il livello extra di array
    const [dieta, setDieta] = useState([
        { "giorno": "Allenante", "grammatura": 150, "alimento": "Riso" },
        { "giorno": "Riposo", "grammatura": 100, "alimento": "Insalata" },
        { "giorno": "Allenante", "grammatura": 200, "alimento": "Pollo" },
        { "giorno": "Riposo", "grammatura": 250, "alimento": "Pasta" }
    ]);

    return (
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full border-collapse border border-green-700">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Giorno</th>
                        <th className="border border-gray-300 p-2">Grammatura (g)</th>
                        <th className="border border-gray-300 p-2">Alimento</th>
                    </tr>
                </thead>
                <tbody>
                    {dieta.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">{item.giorno}</td>
                            <td className="border border-gray-300 p-2">{item.grammatura}</td>
                            <td className="border border-gray-300 p-2">{item.alimento}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Alimentazione;


