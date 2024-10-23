import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SelectBox } from './SelectBox';
import Button from './Button'; // Assicurati che il percorso sia corretto

const Alimentazione = () => {
  const { clientId } = useParams();

  const [nutrition, setNutrition] = useState({
    Allenante: [
      { pasto: 'Colazione', alimenti: [] },
      { pasto: 'Primo Spuntino', alimenti: [] },
      { pasto: 'Pranzo', alimenti: [] },
      { pasto: 'Secondo Spuntino', alimenti: [] },
      { pasto: 'Cena', alimenti: [] },
    ],
    Riposo: [
      { pasto: 'Colazione', alimenti: [] },
      { pasto: 'Primo Spuntino', alimenti: [] },
      { pasto: 'Pranzo', alimenti: [] },
      { pasto: 'Secondo Spuntino', alimenti: [] },
      { pasto: 'Cena', alimenti: [] },
    ],
  });

  const [foods, setFoods] = useState([]);
  const [savedDays, setSavedDays] = useState({
    Allenante: false,
    Riposo: false,
  });

  const fetchFoods = async () => {
    try {
      const response = await fetch('http://localhost:3000/foods');
      const data = await response.json();

      const formattedFoods = data.map(food => ({
        ...food,
        descrizione: food.descrizione
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      }));

      setFoods(formattedFoods);
    } catch (error) {
      console.error('Errore nel recupero degli alimenti:', error);
    }
  };

  const fetchNutritionPlan = async (clientId) => {
    try {
      const response = await fetch(`http://localhost:3000/nutrition-plan/${clientId}`);
  
      if (!response.ok) {
        throw new Error('Errore durante il recupero del piano nutrizionale');
      }
  
      const data = await response.json();
  
      setNutrition((prevNutrition) => {
        const updatedNutrition = { ...prevNutrition };
        
        data.forEach((item) => {
          const giorno = item.giorno;
          const pasto = item.pasto;
        
          const pastoEntry = updatedNutrition[giorno].find(p => p.pasto === pasto);
        
          if (pastoEntry) {
            pastoEntry.alimenti.push({
              alimento: item.alimento,
              grammatura: item.grammatura,
            });
          }
        });
        
        return updatedNutrition;
      });
    } catch (error) {
      console.error('Errore nel recupero dei piani nutrizionali:', error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    if (clientId) {
      fetchNutritionPlan(clientId);
    }
  }, [clientId]);

  const handleTempChange = (giorno, pasto, field, value, index) => {
    setNutrition((prev) => {
      const updatedNutrition = {
        ...prev,
        [giorno]: prev[giorno].map((item) =>
          item.pasto === pasto
            ? {
                ...item,
                alimenti: item.alimenti.map((alimento, i) =>
                  i === index ? { ...alimento, [field]: value } : alimento
                ),
              }
            : item
        ),
      };
      return updatedNutrition;
    });
  };

  const addAlimento = (giorno, pasto) => {
    const newAlimento = { alimento: '', grammatura: '' };
    const updatedNutrition = {
      ...nutrition,
      [giorno]: nutrition[giorno].map((item) =>
        item.pasto === pasto
          ? { ...item, alimenti: [...item.alimenti, newAlimento] }
          : item
      ),
    };
    setNutrition(updatedNutrition);
  };

  const removeAlimento = (giorno, pasto, index) => {
    const updatedNutrition = {
      ...nutrition,
      [giorno]: nutrition[giorno].map((item) =>
        item.pasto === pasto
          ? { ...item, alimenti: item.alimenti.filter((_, i) => i !== index) }
          : item
      ),
    };
    setNutrition(updatedNutrition);
  };

  const saveDay = async (giorno) => {
    const payload = {
      clientId,
      nutritionPlan: nutrition,
    };

    try {
      const response = await fetch('http://localhost:3000/nutrition-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      if (response.ok) {
        console.log('Piano nutrizionale salvato:', data);
        setSavedDays((prev) => ({ ...prev, [giorno]: !prev[giorno] }));
      } else {
        console.error('Errore:', data.message);
      }
    } catch (error) {
      console.error('Errore nel salvataggio del piano nutrizionale:', error);
    }
  };

  return (
    <div className="overflow-x-auto mt-4 font-nowalt">
      <h1 className="text-2xl font-bold text-white mb-6">Scheda Alimentare</h1>
      {['Allenante', 'Riposo'].map((giorno) => (
        <div key={giorno} className="mb-8">
          <h2 className="text-xl font-bold text-white pb-5">{giorno}</h2>
          <div className="flex justify-center">
            <table className="min-w-[90vw] border border-light-blue-shadow table-auto lg:table-fixed shadow-card">
              <thead className="bg-light-blue-shadow text-white">
                <tr className="text-center">
                  <th className="text-center border border-light-blue-shadow p-2">
                    Pasto
                  </th>
                  <th className="text-center border border-light-blue-shadow p-2">
                    Alimento
                  </th>
                  <th className="text-center border border-light-blue-shadow p-2">
                    Grammatura (g)
                  </th>
                  <th className="text-center border border-light-blue-shadow p-2">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-primary-blue text-white">
                {nutrition[giorno].map((meal, mealIndex) => (
                  <tr key={mealIndex} className="">
                    <td className="border border-light-blue-shadow p-2 text-left pl-5">
                      {meal.pasto}
                    </td>
                    <td className="border border-light-blue-shadow p-2">
                      {meal.alimenti.map((alimento, index) => (
                        <div key={index} className="my-2 flex justify-center items-center">
                          {savedDays[giorno] ? (
                            <span>{alimento.alimento}</span>
                          ) : (
                            <SelectBox
                              label="Seleziona Alimento"
                              name={`alimento-${giorno}-${meal.pasto}-${index}`}
                              value={alimento.alimento}
                              onChange={(e) =>
                                handleTempChange(
                                  giorno,
                                  meal.pasto,
                                  'alimento',
                                  e.target.value,
                                  index
                                )
                              }
                              options={foods.map((food) => ({
                                value: food.descrizione,
                                label: food.descrizione,
                              }))}
                              required
                            />
                          )}
                        </div>
                      ))}
                    </td>
                    <td className="border border-light-blue-shadow p-2">
                      {meal.alimenti.map((alimento, index) => (
                        <div key={index} className="mb-2">
                          {savedDays[giorno] ? (
                            <span>{alimento.grammatura} g</span>
                          ) : (
                            <input
                              min='0'
                              type="number"
                              value={alimento.grammatura || ''}
                              onChange={(e) =>
                                handleTempChange(
                                  giorno,
                                  meal.pasto,
                                  'grammatura',
                                  e.target.value,
                                  index
                                )
                              }
                              className="bg-dark-blue-shadow text-white border-2 outline-none border-secondary-gray hover:border-secondary-green focus:border-secondary-green p-1 rounded w-1/3 my-2"
                            />
                          )}
                        </div>
                      ))}
                    </td>
                    <td className="border border-none p-2 flex justify-center">
                      <div className="flex flex-wrap justify-center gap-2 pt-2">
                        {!savedDays[giorno] && (
                          <Button
                            type="button"
                            onClick={() => addAlimento(giorno, meal.pasto)}
                            text="Aggiungi Alimento +"
                          />
                        )}
                        {meal.alimenti.length > 0 && !savedDays[giorno] && (
                          <Button
                            type="button"
                            onClick={() =>
                              removeAlimento(
                                giorno,
                                meal.pasto,
                                meal.alimenti.length - 1
                              )
                            }
                            text="Rimuovi"
                            color="#C71C24"
                            txtcolor="#FFFFFF"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-center pt-5">
            <Button
              type="button"
              onClick={() => {
                saveDay(giorno);
                saveNutritionPlan(clientId);
              }}
              text={savedDays[giorno] ? 'Modifica' : 'Salva'}
              color={savedDays[giorno] ? '#ffc107' : ''}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alimentazione;
