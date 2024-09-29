// src/components/NutritionTable.js


const Alimentazione = ({ nutrition }) => {
    return (
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Giorno</th>
                        <th className="border border-gray-300 p-2">Grammatura (g)</th>
                        <th className="border border-gray-300 p-2">Alimento</th>
                    </tr>
                </thead>
                <tbody>
                    {nutrition.map((item, index) => (
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
