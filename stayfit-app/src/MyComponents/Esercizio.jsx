import { useState } from 'react';

const Esercizio = () => {
  // Stato che contiene i dati degli esercizi
  const [exercises, setExercises] = useState([
    { giorno: 'Lunedì', esercizio: 'Squat', set: 4, rep: 10, rest: 1.5 },
    { giorno: 'Martedì', esercizio: 'Panca Piana', set: 3, rep: 8, rest: 2 },
    { giorno: 'Mercoledì', esercizio: 'Deadlift', set: 5, rep: 5, rest: 2.5 },
    { giorno: 'Giovedì', esercizio: 'Military Press', set: 4, rep: 6, rest: 2 },
    { giorno: 'Venerdì', esercizio: 'Pull-up', set: 4, rep: 8, rest: 1.5 }
  ]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-secondary-gray">
        <thead>
          <tr className="bg-secondary-green">
            <th className="border border-secondary-gray p-2">Giorno</th>
            <th className="border border-secondary-gray p-2">Esercizio</th>
            <th className="border border-secondary-gray p-2">Set</th>
            <th className="border border-secondary-gray p-2">Rep</th>
            <th className="border border-secondary-gray p-2">Rest (min)</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, index) => (
            <tr key={index}>
              <td className="border border-secondary-gray p-2">{exercise.giorno}</td>
              <td className="border border-secondary-gray p-2">{exercise.esercizio}</td>
              <td className="border border-secondary-gray p-2">{exercise.set}</td>
              <td className="border border-secondary-gray p-2">{exercise.rep}</td>
              <td className="border border-secondary-gray p-2">{exercise.rest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Esercizio;

