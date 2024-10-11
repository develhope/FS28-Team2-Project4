import { useState, useEffect } from "react";
import { SelectBox } from "./SelectBox";

const Alimentazione = () => {
  const [nutrition, setNutrition] = useState([
    { giorno: "Allenante", grammatura: 150, alimento: "Riso" },
    { giorno: "Riposo", grammatura: 100, alimento: "Insalata" },
    { giorno: "Allenante", grammatura: 200, alimento: "Pollo" },
    { giorno: "Riposo", grammatura: 250, alimento: "Pasta" }
  ]);

  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");

  // Funzione per recuperare gli alimenti dal server
  const fetchFoods = async () => {
    try {
      const response = await fetch("http://localhost:3000/foods");
      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error("Errore nel recupero degli alimenti:", error);
    }
  };

  useEffect(() => {
    fetchFoods(); // Recupera gli alimenti al caricamento del componente
  }, []);

  const handleFoodChange = (e) => {
    setSelectedFood(e.target.value);
  };

  return (
    <div className="overflow-x-auto pt-10 flex justify-center">
      <table className="min-w-[90%] border-collapse border border-secondary-gray">
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
              <td className="border borde-secondary-gray p-2">
                {/* Aggiungi la SelectBox per selezionare l'alimento */}
                <SelectBox
                  label="Seleziona Alimento"
                  name={`food-${index}`}
                  value={selectedFood}
                  onChange={handleFoodChange}
                  options={foods.map((food) => ({
                    value: food.id, // L'id come valore
                    label: food.descrizione // Descrizione come testo visibile
                  }))}
                  required
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alimentazione;
