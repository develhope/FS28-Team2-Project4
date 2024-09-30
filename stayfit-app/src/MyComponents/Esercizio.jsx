import { useState, useEffect } from 'react';

const Esercizio = () => {
  const [exercises, setExercises] = useState({
    Lunedì: [],
    Martedì: [],
    Mercoledì: [],
    Giovedì: [],
    Venerdì: [],
    Sabato: [],
  });

  const [gymExercises, setGymExercises] = useState({});
  const [editIndex, setEditIndex] = useState({});
  const [tempValues, setTempValues] = useState({});

  const giorniOptions = [
    'Lunedì',
    'Martedì',
    'Mercoledì',
    'Giovedì',
    'Venerdì',
    'Sabato',
  ];
  const setOptions = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10];
  const repOptions = [0, 4, 6, 8, 10, 12, 15, 20, 25];
  const restOptions = [0, 0.3, 0.5, 1, 1.3, 1.5, 2, 2.3, 2.5, 3, 4];

  useEffect(() => {
    fetch('/gymExercises.json')
      .then((response) => response.json())
      .then((data) => setGymExercises(data))
      .catch((error) =>
        console.error('Errore nel caricamento del database:', error)
      );
  }, []);

  const toggleEditMode = (giorno, index) => {
    if (editIndex[giorno] === index) {
      setEditIndex((prev) => ({ ...prev, [giorno]: null }));
      setTempValues({});
    } else {
      setEditIndex((prev) => ({ ...prev, [giorno]: index }));
      setTempValues({ ...exercises[giorno][index] });
    }
  };

  const handleTempChange = (field, value) => {
    setTempValues((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = (giorno, index) => {
    const updatedExercises = {
      ...exercises,
      [giorno]: exercises[giorno].map((item, i) =>
        i === index ? tempValues : item
      ),
    };
    setExercises(updatedExercises);
    setEditIndex((prev) => ({ ...prev, [giorno]: null }));
    setTempValues({});
  };

  const addExercise = (giorno) => {
    const newExercise = {
      esercizio: '',
      gruppoMuscolare: '',
      set: '',
      rep: '',
      rest: '',
    };
    const updatedExercises = {
      ...exercises,
      [giorno]: [...exercises[giorno], newExercise],
    };
    setExercises(updatedExercises);
  };

  const removeExercise = (giorno, index) => {
    const updatedExercises = {
      ...exercises,
      [giorno]: exercises[giorno].filter((_, i) => i !== index),
    };
    setExercises(updatedExercises);
  };

  const getAvailableExercises = (gruppoMuscolare) => {
    return gymExercises[gruppoMuscolare] || [];
  };

  return (
    <div className="overflow-x-auto mt-4 font-nowalt">
      {giorniOptions.map((giorno) => (
        <div key={giorno} className="mb-8">
          <h2 className="text-xl font-bold text-white">
            {giorno}
          </h2>
          <button
            className="bg-secondary-green hover:bg-green-700 text-primary-blue font-bold py-1 px-2 rounded mt-2 mb-4 shadow-card"
            onClick={() => addExercise(giorno)}
          >
            Aggiungi Esercizio +
          </button>
          <table className="min-w-full border border-primary-blue table-auto lg:table-fixed shadow-card">
            <thead className="bg-primary-blue text-white">
              <tr>
                <th className="border border-primary-blue p-2 text-left">
                  Gruppo Muscolare
                </th>
                <th className="border border-primary-blue p-2 text-left">
                  Esercizio
                </th>
                <th className="border border-primary-blue p-2 text-left">
                  Set
                </th>
                <th className="border border-primary-blue p-2 text-left">
                  Rep
                </th>
                <th className="border border-primary-blue p-2 text-left">
                  Rest (min)
                </th>
                <th className="border border-primary-blue p-2 text-left">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-light-blue-shadow text-white">
              {exercises[giorno].map((exercise, index) => (
                <tr
                  key={index}
                  className="hover:bg-light-blue-shadow transition-colors"
                >
                  <td className="border border-primary-blue p-2">
                    {editIndex[giorno] === index ? (
                      <select
                        value={tempValues.gruppoMuscolare || ''}
                        onChange={(e) =>
                          handleTempChange('gruppoMuscolare', e.target.value)
                        }
                        className="bg-dark-blue-shadow text-white border border-gray-500 p-1 rounded"
                      >
                        <option value="">Seleziona Gruppo Muscolare</option>
                        {Object.keys(gymExercises).map((group, idx) => (
                          <option key={idx} value={group}>
                            {group}
                          </option>
                        ))}
                      </select>
                    ) : (
                      exercise.gruppoMuscolare || ''
                    )}
                  </td>
                  <td className="border border-primary-blue p-2">
                    {editIndex[giorno] === index ? (
                      <select
                        value={tempValues.esercizio || ''}
                        onChange={(e) =>
                          handleTempChange('esercizio', e.target.value)
                        }
                        className="bg-dark-blue-shadow text-white border border-gray-500 p-1 rounded"
                      >
                        <option value="">Seleziona Esercizio</option>
                        {getAvailableExercises(tempValues.gruppoMuscolare).map(
                          (exerciseOption, idx) => (
                            <option key={idx} value={exerciseOption.name}>
                              {exerciseOption.name}
                            </option>
                          )
                        )}
                      </select>
                    ) : (
                      exercise.esercizio || ''
                    )}
                  </td>
                  <td className="border border-primary-blue p-2">
                    {editIndex[giorno] === index ? (
                      <select
                        value={tempValues.set || ''}
                        onChange={(e) =>
                          handleTempChange('set', e.target.value)
                        }
                        className="bg-dark-blue-shadow text-white border border-gray-500 p-1 rounded"
                      >
                        {setOptions.map((setOption, idx) => (
                          <option key={idx} value={setOption}>
                            {setOption}
                          </option>
                        ))}
                      </select>
                    ) : (
                      exercise.set || ''
                    )}
                  </td>
                  <td className="border border-primary-blue p-2">
                    {editIndex[giorno] === index ? (
                      <select
                        value={tempValues.rep || ''}
                        onChange={(e) =>
                          handleTempChange('rep', e.target.value)
                        }
                        className="bg-dark-blue-shadow text-white border border-gray-500 p-1 rounded"
                      >
                        {repOptions.map((repOption, idx) => (
                          <option key={idx} value={repOption}>
                            {repOption}
                          </option>
                        ))}
                      </select>
                    ) : (
                      exercise.rep || ''
                    )}
                  </td>
                  <td className="border border-primary-blue p-2">
                    {editIndex[giorno] === index ? (
                      <select
                        value={tempValues.rest || ''}
                        onChange={(e) =>
                          handleTempChange('rest', e.target.value)
                        }
                        className="bg-dark-blue-shadow text-white border border-gray-500 p-1 rounded"
                      >
                        {restOptions.map((restOption, idx) => (
                          <option key={idx} value={restOption}>
                            {restOption}
                          </option>
                        ))}
                      </select>
                    ) : (
                      exercise.rest || ''
                    )}
                  </td>
                  <td className="border border-primary-blue p-2 flex space-x-2">
                    {editIndex[giorno] === index ? (
                      <button
                        className="bg-secondary-green hover:bg-green-700 text-primary-blue font-bold py-1 px-2 rounded"
                        onClick={() => saveChanges(giorno, index)}
                      >
                        Salva
                      </button>
                    ) : (
                      <button
                        className="bg-white hover:bg-secondary-green text-white font-bold py-1 px-2 rounded"
                        onClick={() => toggleEditMode(giorno, index)}
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      className="bg-white hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => removeExercise(giorno, index)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Esercizio;

