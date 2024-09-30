import { useState } from "react";

const Alimentazione = () => {
    const [nutrition, setNutrition] = useState([
        { "giorno": "Allenante", "grammatura": 150, "alimento": "Riso" },
        { "giorno": "Riposo", "grammatura": 100, "alimento": "Insalata" },
        { "giorno": "Allenante", "grammatura": 200, "alimento": "Pollo" },
        { "giorno": "Riposo", "grammatura": 250, "alimento": "Pasta" }
    ]);

    return (
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full border-collapse border border-secondary-gray">
                <thead>
                    <tr className="bg-secondary-green">
                        <th className="border borde-secondary-gray p-2">Giorno</th>
                        <th className="border borde-secondary-gray p-2">Grammatura (g)</th>
                        <th className="border borde-secondary-gray p-2">Alimento</th>
                    </tr>
                </thead>
                <tbody>
                    {nutrition.map((item, index) => (
                        <tr className="text-white" key={index}>
                            <td className="border borde-secondary-gray p-2">{item.giorno}</td>
                            <td className="border borde-secondary-gray p-2">{item.grammatura}</td>
                            <td className="border borde-secondary-gray p-2">{item.alimento}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Alimentazione;


