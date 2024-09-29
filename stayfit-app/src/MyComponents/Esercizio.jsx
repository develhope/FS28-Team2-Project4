// src/components/WorkoutTable.js


const Esercizio = () => {


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Giorno</th>
                        <th className="border border-gray-300 p-2">Esercizio</th>
                        <th className="border border-gray-300 p-2">Set</th>
                        <th className="border border-gray-300 p-2">Rep</th>
                        <th className="border border-gray-300 p-2">Rest (min)</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2">giorno</td>
                            <td className="border border-gray-300 p-2">esercizio</td>
                            <td className="border border-gray-300 p-2">set</td>
                            <td className="border border-gray-300 p-2">rep</td>
                            <td className="border border-gray-300 p-2">rest</td>
                        </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Esercizio;
