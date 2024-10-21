import { useState, useEffect } from 'react';
import Button from './Button'; // Assicurati che il percorso sia corretto

const Esercizio = () => {
  const [exercises, setExercises] = useState({
    Giorno1: [],
    Giorno2: [],
    Giorno3: [],
    Giorno4: [],
    Giorno5: [],
  });

  const [gymExercises, setGymExercises] = useState({});
  const [editIndex, setEditIndex] = useState({});
  const [tempValues, setTempValues] = useState({});
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [trainingType, setTrainingType] = useState('Ipertrofia'); // Stato per il tipo di allenamento
  const [setOptions, setSetOptions] = useState([]);
  const [repOptions, setRepOptions] = useState([]);
  const [restOptions, setRestOptions] = useState([]);

  const giorniOptions = ['Giorno1', 'Giorno2', 'Giorno3', 'Giorno4', 'Giorno5'];

  const trainingOptions = {
    Ipertrofia: {
      setOptions: [3, 4, 5],
      repOptions: [8, 10, 12],
      restOptions: [1, 1.5],
    },
    Forza: {
      setOptions: [3, 4, 5, 6],
      repOptions: [4, 5, 6],
      restOptions: [2, 2.5, 3],
    },
    Dimagrimento: {
      setOptions: [2, 3, 4],
      repOptions: [15, 20, 25],
      restOptions: [0.5, 1],
    },
  };

  useEffect(() => {
    // Aggiorna le opzioni per set, rep e rest in base al tipo di allenamento
    const {
      setOptions: newSetOptions,
      repOptions: newRepOptions,
      restOptions: newRestOptions,
    } = trainingOptions[trainingType];
    setSetOptions(newSetOptions);
    setRepOptions(newRepOptions);
    setRestOptions(newRestOptions);
  }, [trainingType]);

  const formatDayName = (giorno) => {
    return giorno.replace(/([a-zA-Z]+)(\d+)/, '$1 $2');
  };

  const exercisesApi =
    'https://raw.githubusercontent.com/mario-sica/API/refs/heads/main/gymExercises.json';

  useEffect(() => {
    fetch(exercisesApi)
      .then((response) => response.json())
      .then((data) => {
        setGymExercises(data);
        console.log(data);
      })
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
      type: '',
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
    return gymExercises[gruppoMuscolare] || [''];
  };

  return (
    <div className="overflow-x-auto mt-4 font-nowalt">
      <h1 className="text-2xl font-bold text-white mb-6">
        Scheda di Allenamento
      </h1>
      <div className='flex gap-5 justify-center'>
        <div className="mb-4">
          <label className="text-white" htmlFor="trainingType">
            Tipo di allenamento:{' '}
          </label>
          <select
            id="trainingType"
            value={trainingType}
            onChange={(e) => setTrainingType(e.target.value)}
            className="bg-dark-blue-shadow text-white border border-gray-500 p-1 rounded"
          >
            {Object.keys(trainingOptions).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-white" htmlFor="numberOfDays">
            Scegli i giorni di allenamento:{' '}
          </label>
          <select
            id="numberOfDays"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(Number(e.target.value))}
            className="bg-dark-blue-shadow text-white border border-gray-500 p-1 rounded"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {giorniOptions.slice(0, numberOfDays).map((giorno) => (
        <div key={giorno} className="mb-8">
          <h2 className="text-xl font-bold text-white">
            {formatDayName(giorno)}
          </h2>
          <div className="w-full flex justify-center items-center py-5">
            <Button
              text="Aggiungi Esercizio +"
              onClick={() => addExercise(giorno)}
              color="#C1FF72"
              txtcolor="#001E23"
            />
          </div>
          <div className="flex justify-center">
            <table className="min-w-[90vw] border border-light-blue-shadow table-auto lg:table-fixed shadow-card">
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
                    className={`hover:bg-light-blue-shadow transition-colors`}
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
                          <option value="">Gruppo Muscolare</option>
                          {Object.keys(gymExercises).map((gruppo) => (
                            <option key={gruppo} value={gruppo}>
                              {gruppo.charAt(0).toUpperCase() +
                                gruppo.slice(1).toLowerCase()}
                            </option>
                          ))}
                        </select>
                      ) : (
                        exercise.gruppoMuscolare.charAt(0).toUpperCase() +
                          exercise.gruppoMuscolare.slice(1).toLowerCase() || ''
                      )}
                    </td>
                    <td className="border border-primary-blue p-2">
                      {editIndex[giorno] === index ? (
                        <select
                          value={tempValues.esercizio || ''}
                          onChange={(e) =>
                            handleTempChange('esercizio', e.target.value)
                          }
                          className="bg-dark-blue-shadow text-white border border-gray-500 p-1 rounded min-w-[150px] text-ellipsis"
                        >
                          <option value="">Esercizio</option>
                          {getAvailableExercises(
                            tempValues.gruppoMuscolare
                          ).map((esercizio, idx) => (
                            <option
                              key={`${esercizio.id}-${idx}`}
                              value={esercizio.name}
                            >
                              {esercizio.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        exercise.esercizio
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
                          <option value="">Set</option>
                          {setOptions.map((set) => (
                            <option key={set} value={set}>
                              {set}
                            </option>
                          ))}
                        </select>
                      ) : (
                        exercise.set
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
                          <option value="">Rep</option>
                          {repOptions.map((rep) => (
                            <option key={rep} value={rep}>
                              {rep}
                            </option>
                          ))}
                        </select>
                      ) : (
                        exercise.rep
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
                          <option value="">Rest</option>
                          {restOptions.map((rest) => (
                            <option key={rest} value={rest}>
                              {rest}
                            </option>
                          ))}
                        </select>
                      ) : (
                        exercise.rest
                      )}
                    </td>
                    <td className="border border-primary-blue p-2">
                      {editIndex[giorno] === index ? (
                        <div className="flex flex-wrap gap-2 justify-center">
                          <Button
                            text="Salva"
                            onClick={() => saveChanges(giorno, index)}
                            color="#C1FF72"
                            txtcolor="#001E23"
                          />
                          <Button
                            text="Annulla"
                            onClick={() => toggleEditMode(giorno, index)}
                            color="#FF6B6B"
                            txtcolor="#001E23"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2 justify-center">
                          <Button
                            text="Modifica"
                            onClick={() => toggleEditMode(giorno, index)}
                            color="#C1FF72"
                            txtcolor="#001E23"
                          />
                          <Button
                            text="Rimuovi"
                            onClick={() => removeExercise(giorno, index)}
                            color="#FF6B6B"
                            txtcolor="#001E23"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Esercizio;
